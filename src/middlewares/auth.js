const User = require("../models/users");
const USER_SAFE_DATA = "firstName lastName about age skills gender photoUrl";

const userAuth = async (req, res, next) => {
  const jwt = require("jsonwebtoken");
  //check if there token exist
  const { token } = req.cookies;

  try {
    if (!token) {
      
      return res.status(401).send("Please Login")

    }  

    const decodedToken = jwt.verify(token, "verySecret");

    const { _id } = decodedToken;

    console.log(_id)
    const user = await User.findById({ _id }).select(USER_SAFE_DATA);
 console.log(_id,user)
    req.user = user;
    next();
  } catch (err) {
    res.status(400).json("Error" + err.message);
  }

  
};

module.exports = {
  userAuth,
};
