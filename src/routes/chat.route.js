const express = require("express");
const chatModal = require("../models/chat");
const { userAuth } = require("../middlewares/auth");
const connectionRequestmodel = require("../models/connectionRequest");
const { isValidObjectId } = require("mongoose");
const ExpressError = require("../utils/ExpressErrorHandler");

const ChatRouter = express.Router();

ChatRouter.get("/chat/:targetUserId", userAuth, async (req, res, next) => {
  const userId = req.user._id;
  const targetUserId = req.params.targetUserId;
  
  try {

    console.log(!isValidObjectId(targetUserId));
    
    if (!isValidObjectId(targetUserId)) {
        console.log('inside validation');
        
     return next(new ExpressError("Invalid Id", 400));
    } 


    console.log('after validation');
    
    const connection = await connectionRequestmodel.findOne({
     $or: [
        {fromUserId:userId,toUserId:targetUserId,status:'accepted'},
        {fromUserId:targetUserId,toUserId:userId,status:'accepted'}
     ]
    }); 

    if(!connection){
        return next (new ExpressError('Your are not connected with this user',400))
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
    console.log(err);
    next(err);
  }
});

module.exports = ChatRouter;
