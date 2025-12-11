const express = require("express");
const router = express.Router();
const { userAuth } = require("../middlewares/auth");

const User = require("../models/users.js");
const connectionRequestmodel = require("../models/connectionRequest");

router.post("/request/send/:status/:userId", userAuth, async (req, res) => {
  try {
    const status = req.params.status;
    const toUserId = req.params.userId;
    const fromUserId = req.user._id;

    // const alreadyRequested = await connectionRequestmodel.findOne({
    //   $or:[{  fromUserId: fromUserId,
    //   toUserId: toUserId},{fromUserId:toUserId,toUserId:fromUserId}]

    // });

    const toUserExist = await User.findById(toUserId);

    if (!toUserExist) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    const allowedStatusType = ["ignored", "interested"];

    if (!allowedStatusType.includes(status)) {
      return res.status(400).json({
        message: "Invalid status type",
      });
    }

    const alreadyRequested = await connectionRequestmodel.findOne({
      $or: [
        { fromUserId: fromUserId, toUserId: toUserId },
        { fromUserId: toUserId, toUserId: fromUserId },
      ],
    });

    if (alreadyRequested) {
      return res.status(400).json({
        message: "Already have a connection request",
      });
    }
    const connection = new connectionRequestmodel({
      fromUserId: fromUserId,
      toUserId: toUserId,
      status: status,
    });

    await connection.save();

    res.status(200).json({
      message:
        (status === "interested"
          ? req.user.firstName + ` is ${status}   in  `
          : req.user.firstName + ` ${status} `) + toUserExist.firstName,
    });
  } catch (err) {
    res.status(500).send("Error: " + err.message);
    console.log(err);
  }
});

router.post(
  "/request/review/:status/:requestrId",
  userAuth,
  async (req, res) => {
    try {
      const loggedUserId = req.user._id;
      const status = req.params.status;
      const requestId = req.params.requestrId;

   

      const allowedStatus = ["accepted", "rejected"];

      if (!allowedStatus.includes(status)) {
        return res.status(400).json({
          message: "Invalid status type",
        });
      }
      console.log(requestId);
      

      const connectionRequest = await connectionRequestmodel.findOne({
        _id:requestId,
        toUserId:loggedUserId,
        status:"interested"
      });

      if (!connectionRequest) {
        res.status(500).json({
          message: "Connection request not found",
        });
      }

    
      
      connectionRequest.status =status;
     const data= await  connectionRequest.save();
     res.status(200).json({
      message:"connection request "+status,data
     })

      


    } catch (err) {
      res.status(500).send("Error: " + err.message);
      console.log(err);
    }
  }
);

module.exports = router;
