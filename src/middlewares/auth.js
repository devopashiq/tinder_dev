const User = require("../models/users");
const USER_SAFE_DATA =
  "firstName lastName about age skils gender photoUrl membershipType isPremium";

const userAuth = async (req, res, next) => {
  const jwt = require("jsonwebtoken");
  console.log("hello"); //check if there token exist
  const { token } = req.cookies;

  try {
    if (!token) {
      return res.status(401).send("Please Login");
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    const { _id } = decodedToken;

    const user = await User.findById(_id).select(USER_SAFE_DATA);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Please Login",
      });
    }

    req.user = user;
    next();
  } catch (err) {
    console.log(err);

    res.status(400).json("Error" + err.message);
  }
};

module.exports = {
  userAuth,
};
