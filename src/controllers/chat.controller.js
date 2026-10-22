const chatModal = require("../models/chat");
const connectionRequestmodel = require("../models/connectionRequest");
const { isValidObjectId } = require("mongoose");
const ExpressError = require("../utils/ExpressErrorHandler");


module.exports.chatWithUsers =async (req, res, next) => {
  const userId = req.user._id;
  const targetUserId = req.params.targetUserId;

  try {
    if (!isValidObjectId(targetUserId)) {
      return next(new ExpressError("Invalid Id", 400));
    }

    const connection = await connectionRequestmodel.findOne({
      $or: [
        { fromUserId: userId, toUserId: targetUserId, status: "accepted" },
        { fromUserId: targetUserId, toUserId: userId, status: "accepted" },
      ],
    });

    if (!connection) {
      return next(
        new ExpressError("Your are not connected with this user", 400),
      );
    }

    let chat = await chatModal
      .findOne({
        participants: {
          $all: [userId, targetUserId],
        },
      })
      .populate({
        path: "message.senderId",
        select: "firstName lastName",
      });

    if (!chat) {
      chat = new chatModal({
        participants: [userId, targetUserId],
        message: [],
      });

      await chat.save();
    }

    res.json(chat);
  } catch (err) {
    next(err);
  }
}
