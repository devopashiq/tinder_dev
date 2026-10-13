const express = require("express");
const router = express.Router();
const { userAuth } = require("../middlewares/auth");
const {
  createPaymentOrder,
  handleRazorpayWebhook,
} = require("../controllers/payment.controller");

router.post("/payment/order", userAuth, createPaymentOrder);

router.post("/webhook/razorpay", handleRazorpayWebhook);

module.exports = router;
