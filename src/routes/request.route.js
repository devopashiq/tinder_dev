const express = require("express");
const router = express.Router();
const { userAuth } = require("../middlewares/auth");
const {
  sendConnectionRequest,
  reviewConnectionRequest,
} = require("../controllers/request.controller");

router.post("/request/send/:status/:userId", userAuth, sendConnectionRequest);

router.post(
  "/request/review/:status/:requestrId",
  userAuth,
  reviewConnectionRequest,
);

module.exports = router;
