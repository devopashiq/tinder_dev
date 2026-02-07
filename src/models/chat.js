const mongoose = require("mongoose");

const messageScheme = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    text: { type: String },
    status: { type: String, enum: ["sent","seen", "delivered"], default: "sent" },
    seenAt:{type:Date}
  },
  { timestamps: true },
);

const chatScheme = new mongoose.Schema({
  participants: [
    { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  ],

  message: [messageScheme],
});

const chatModal = new mongoose.model("Chat", chatScheme);
module.exports = chatModal;
