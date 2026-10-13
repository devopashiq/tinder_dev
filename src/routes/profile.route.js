const express = require("express");
const router = express.Router();
const { userAuth } = require("../middlewares/auth");
const {
  viewProfile,
  editProfile,
  changePassword,
} = require("../controllers/profile.controller");

router.get("/profile/view", userAuth, viewProfile);

router.patch("/profile/edit", userAuth, editProfile);

router.patch("/profile/password", userAuth, changePassword);

module.exports = router;
