const { run } = require("../utils/sendEmail");
const User = require("../models/users.js");
const connectionRequestmodel = require("../models/connectionRequest");

module.exports.sendConnectionRequest = async (req, res, next) => {
  try {
    const status = req.params.status;
    const toUserId = req.params.userId;
    const fromUserId = req.user._id;

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
    await run();

    res.status(200).json({
      message:
        (status === "interested"
          ? req.user.firstName + ` is ${status}   in  `
          : req.user.firstName + ` ${status} `) + toUserExist.firstName,
    });
  } catch (err) {
    next(err);
  }
};

module.exports.reviewConnectionRequest = async (req, res, next) => {
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

    const connectionRequest = await connectionRequestmodel.findOne({
      _id: requestId,
      toUserId: loggedUserId,
      status: "interested",
    });

    if (!connectionRequest) {
      return res.status(500).json({
        message: "Connection request not found",
      });
    }

    connectionRequest.status = status;
    const data = await connectionRequest.save();

    res.status(200).json({
      message: "connection request " + status,
      data,
    });
  } catch (err) {
    next(err);
  }
};
