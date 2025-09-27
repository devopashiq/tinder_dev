const User = require("../models/users");

const userAuth = async (req, res, next) => {
  const jwt = require("jsonwebtoken");
  //check if there token exist
  const { token } = req.cookies;

  try {
    if (!token) {
      throw new Error("Token Not Found");
    }  

    const decodedToken = jwt.verify(token, "verySecret");
    const { _id } = decodedToken;
    const user = await User.findById({ _id });

    req.user = user;
    next();
  } catch (err) {
    res.status(400).json("Error" + err.message);
  }

  
};

module.exports = {
  userAuth,
};
