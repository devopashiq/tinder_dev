const Razorpay = require("razorpay");
const paymentModal = require("../models/payment");
const {
  validateWebhookSignature,
} = require("razorpay/dist/utils/razorpay-utils");
const User = require("../models/users");

const razorpay = new Razorpay({
  key_id: process.env.RZP_KEY_ID,
  key_secret: process.env.RZP_KEY_SECRET,
});

module.exports.createPaymentOrder = async (req, res, next) => {
  const user = req.user;
  const { type } = req.body;

  try {
    const transactionId = `trn_${Date.now()}`;
    // the amount needs to be converted to the smallest sub-unit
    const order = await razorpay.orders.create({
      amount: type === "Silver" ? 49900 : 99900,
      currency: "INR",
      receipt: transactionId,
      notes: {
        Type: type,
        User: user,
      },
    });

    const payment = new paymentModal({
      user: user._id,
      amount: order.amount,
      membership: type,
      paymentstatus: "pending",
      razorpayTransactionId: transactionId,
      razorpayOrderId: order.id,
    });

    await payment.save();

    res.json(order);
  } catch (err) {
    next(err);
  }
};

module.exports.handleRazorpayWebhook = async (req, res, next) => {
  try {
    const razorpaySignature = req.header("X-Razorpay-Signature");

    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
    const iswebhookValid = validateWebhookSignature(
      req.body.toString(),
      razorpaySignature,
      webhookSecret,
    );

    if (!iswebhookValid) {
      return res.status(400).json({ message: "Invalid Request" });
    }

    const body = JSON.parse(req.body.toString());

    if (body.event === "payment.captured") {
      const payment = await paymentModal.findOne({
        razorpayOrderId: body.payload.payment.entity.order_id,
      });

      if (payment) {
        payment.paymentstatus = "success";
        await payment.save();

        const user = await User.findById(payment.user);
        if (user) {
          user.isPremium = true;
          user.membershipType = payment.membership;
          await user.save();
        }
      }
    }

    if (body.event === "payment.failed") {
      const payment = await paymentModal.findOne({
        razorpayOrderId: body.payload.payment.entity.order_id,
      });

      if (payment) {
        payment.paymentstatus = "failed";
        await payment.save();
      }
    }

    return res.status(200).json({ message: "webhook received" });
  } catch (err) {
    next(err);
  }
};
