const User = require("../models/users");
const ExpressError = require("../utils/ExpressErrorHandler");
const USER_SAFE_DATA =
  "firstName lastName about age skils gender photoUrl membershipType isPremium";

const userAuth = async (req, res, next) => {
  const jwt = require("jsonwebtoken");

  const { token } = req.cookies;

  try {
    if (!token) {
      return res.status(401).send("Please Login");
    }

    let decodedToken;
    try {
      decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return next(new ExpressError("Invalid or expired token. Please login again.", 401));
    }

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
    next(err);
  }
};

module.exports = {
  userAuth,
};
