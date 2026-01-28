const express = require("express");
const router = express.Router();
const { userAuth } = require("../middlewares/auth");
const Razorpay = require("razorpay");

const paymentModal = require("../models/payment");
const {
  validateWebhookSignature,
} = require("razorpay/dist/utils/razorpay-utils");

const razorpay = new Razorpay({
  key_id: process.env.RZP_KEY_ID,
  key_secret: process.env.RZP_KEY_SECRET,
});

router.post("/payment/order", userAuth, async (req, res, next) => {
  const user = req.user;
  const { type } = req.body;
  // console.log(req.body, user);

  try {
    const transactionId = `trn_${Date.now()}`;
    //the amount need convert smallest sub-unit (india 1rs means 100 paisa)
    //500rs = 50000 paisa(500rs *100 Paisa)
    const order = await razorpay.orders.create({
      amount: type === "Silver" ? 50000 : 100000,
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

    // console.log(order);
    res.json(order);
  } catch (err) {
    console.log(err);
    res.json(err);
  }
});

router.post("/webhook/razorpay", async (req, res) => {
  try {
    // console.log("testing..........");

    // console.log(req.headers, req.body);
    // console.log('entring verification');
    

    const razorpaySignature = req.header("X-Razorpay-Signature");

 
    
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
    const iswebhookValid = validateWebhookSignature(
      req.body.toString(),
      razorpaySignature,
      webhookSecret
    );
    //    console.log(razorpaySignature,webhookSecret);

    //  console.log('verification result',iswebhookValid);

    if (!iswebhookValid) {
      return res.status(400).json({ message: "Invalid Request" });
    }
    
    if (req.body.event === "payment.captured") {
      const payment = await paymentModal.findOne({
        razorpayOrderId: req.body.payload.payment.entity.order_id,
      });

      if (payment) {
        payment.paymentstatus = "success";
        await payment.save();

        //TODO: update user premium status
      }
    }
    if (req.body.event === "payment.failed") {
      const payment = await paymentModal.findOne({
        razorpayOrderId: req.body.payload.payment.entity.order_id,
      });

      if (payment) {
        payment.paymentstatus = "failed";
        await payment.save();
      }
    }

    return res.status(200).json({ message: "webhook received" });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
