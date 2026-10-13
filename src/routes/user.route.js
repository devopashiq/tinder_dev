const express = require("express");
const router = express.Router();
const { userAuth } = require("../middlewares/auth");
const {
  getReceivedRequests,
  getConnections,
  getFeed,
  getUserById,
  getUserStatus,
} = require("../controllers/user.controller");

router.get("/user/request/received", userAuth, getReceivedRequests);

router.get("/user/connection", userAuth, getConnections);

router.get("/user/feed", userAuth, getFeed);

router.get("/user/:userId", userAuth, getUserById);

router.get("/user/:userId/status", userAuth, getUserStatus);

module.exports = router;
