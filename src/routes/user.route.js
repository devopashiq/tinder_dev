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

router.get("/request/received", userAuth, getReceivedRequests);

router.get("/connection", userAuth, getConnections);

router.get("/feed", userAuth, getFeed);

router.get("/:userId", userAuth, getUserById);

router.get("/:userId/status", userAuth, getUserStatus);

module.exports = router;
