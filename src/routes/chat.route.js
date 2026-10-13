const express = require("express");
const { userAuth } = require("../middlewares/auth");
const isPremiumUser = require("../middlewares/isPremiumUser");
const ChatRouter = express.Router();
const {chatWithUsers} = require('../controllers/chat.controller')

ChatRouter.get("/chat/:targetUserId", userAuth, isPremiumUser,chatWithUsers);

module.exports = ChatRouter;
