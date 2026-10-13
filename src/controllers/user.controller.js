const connectionRequestmodel = require("../models/connectionRequest");
const ExpressError = require("../utils/ExpressErrorHandler");
const User = require("../models/users");

const USER_SAFE_DATA = "firstName lastName about age skills gender photoUrl";

module.exports.getReceivedRequests = async (req, res) => {
  try {
    const loginedUser = req.user;

    const requests = await connectionRequestmodel
      .find({
        toUserId: loginedUser._id,
        status: "interested",
      })
      .populate("fromUserId", USER_SAFE_DATA);

    res.status(200).json({
      data: requests,
    });
  } catch (err) {
    res.status(500).json("Error: " + err.message);
  }
};

module.exports.getConnections = async (req, res) => {
  try {
    const loggedUserId = req.user._id;

    const connectionRequest = await connectionRequestmodel
      .find({
        $or: [
          {
            fromUserId: loggedUserId,
            status: "accepted",
          },
          {
            toUserId: loggedUserId,
            status: "accepted",
          },
        ],
      })
      .populate("fromUserId", USER_SAFE_DATA)
      .populate("toUserId", USER_SAFE_DATA);

    const data = connectionRequest.map((row) => {
      if (loggedUserId.toString() === row.toUserId._id.toString()) {
        return row.fromUserId;
      } else {
        return row.toUserId;
      }
    });

    res.status(200).json({
      data,
    });
  } catch (err) {
    res.status(500).json("Error :" + err.message);
  }
};

module.exports.getFeed = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 2;

    limit = limit > 50 ? 50 : limit;
    const skip = (page - 1) * limit;

    const logginedUser = req.user;

    const connectionRequests = await connectionRequestmodel
      .find({
        $or: [
          {
            fromUserId: logginedUser._id,
          },
          {
            toUserId: logginedUser._id,
          },
        ],
      })
      .select("fromUserId toUserId");

    const hideUsersFromFeed = new Set();
    connectionRequests.forEach((req) => {
      hideUsersFromFeed.add(req.fromUserId.toString());
      hideUsersFromFeed.add(req.toUserId.toString());
    });

    const users = await User.find({
      $and: [
        {
          _id: {
            $nin: Array.from(hideUsersFromFeed),
          },
        },
        {
          _id: {
            $ne: logginedUser._id,
          },
        },
      ],
    })
      .select(USER_SAFE_DATA)
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      users,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json("Error :" + err.message);
  }
};

module.exports.getUserById = async (req, res, next) => {
  try {
    const userId = req.params.userId.trim();

    const userDetails = await User.findById(userId).select(USER_SAFE_DATA);

    res.status(200).json(userDetails);
  } catch (err) {
    next(new ExpressError("Error in Finding User", 400));
  }
};

module.exports.getUserStatus = async (req, res, next) => {
  try {
    const userId = req.params.userId.trim();

    const userLastSeen = await User.findById(userId).select("lastSeen");

    res.status(200).json(userLastSeen);
  } catch (err) {
    next(new ExpressError("Error in Finding User", 400));
  }
};
