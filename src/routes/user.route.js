const express = require("express");
const router = express.Router();
const { userAuth } = require("../middlewares/auth");
const connectionRequestmodel = require("../models/connectionRequest");

const User = require("../models/users");

const USER_SAFE_DATA = "firstName lastName about age skills gender photoUrl";

router.get("/user/request/received", userAuth, async (req, res) => {
  try {
    //validate user

    const loginedUser = req.user;
    console.log(loginedUser);

    const requests = await connectionRequestmodel
      .find({
        toUserId: loginedUser._id,
        status: "interested",
      })
      .populate("fromUserId", USER_SAFE_DATA);

    res.status(200).json({
      data: requests,
    });

    //get request that status inteseted
    //to user should be the logined user
  } catch (err) {
    res.status(500).json("Error: " + err.message);
  }
});

router.get("/user/connection", userAuth, async (req, res) => {
  try {
    const loggedUserId = req.user._id;

    //get all connection with status if logger user is fromuser id or touserid
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

    console.log(connectionRequest);

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

    //if fromuser ==logger user id then return touser details else from user detaisl
  } catch (err) {
    res.status(500).json("Error :" + err.message);
  }
});

router.get("/feed", userAuth, async (req, res) => {
  try {
    
    const page = parseInt(req.query.page )|| 1;
    let limit = parseInt(req.query.limit) || 2;

   
    

    limit= limit>50?50:limit;
    const skip = (page-1)*limit;

     console.log(page,limit,skip);


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
      .select("fromUserId toUserId")
      

    const hideUsersFromFeed = new Set();
    connectionRequests.forEach((req) => {
      hideUsersFromFeed.add(req.fromUserId.toString());
      hideUsersFromFeed.add(req.toUserId.toString());
    });
    console.log(hideUsersFromFeed);

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
   
       
          // _id: {
          //   $nin: Array.from(hideUsersFromFeed), $ne: logginedUser._id
          // },
        
       
    }).select(USER_SAFE_DATA)
    .skip(skip)
    .limit(limit)

    res.status(200).json({
      users,
    });
  } catch (err) {
    res.status(500).json("Error :" + err.message);
  }
});

module.exports = router;
