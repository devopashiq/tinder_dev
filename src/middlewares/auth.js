const User = require("../models/users");
const USER_SAFE_DATA =
  "firstName lastName about age skill gender photoUrl membershipType isPremium";

const userAuth = async (req, res, next) => {
  const jwt = require("jsonwebtoken");
  console.log("hello");
  //check if there token exist
  const { token } = req.cookies;

  try {
    if (!token) {
      return res.status(401).send("Please Login");
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decodedToken);

    const { _id } = decodedToken;

    
    const user = await User.findById(_id).select(USER_SAFE_DATA);
    console.log(user,"user deatis");
    
    //  console.log(_id,user)
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
