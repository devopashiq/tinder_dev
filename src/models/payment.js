const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    amount: {
      type: Number,
      required: true,
      min: [1, "Amount must be greater than zero"],
    },
    membership: {
      type: String,

      enum: ["Silver", "Gold"],
      message: "{VALUE} is invalid membership",
      required: true,
    },
    paymentstatus: {
      type: String,
      required: true,
      enum: {
        values: ["success", "failed", "pending", "refunded"],
        message: "{VALUE} is invalid status type",
      },
    },
    razorpayPaymentId: {
      type: String,
      unique: true,
      sparse: true,
    },
    razorpayTransactionId: {
      type: String,
      unique: true,
      sparse: true,
      required:true
    },
    razorpayOrderId: {
      type: String,
      unique: true,
      sparse: true,
      required:true
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Payment", paymentSchema);
