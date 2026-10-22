const bcrypt = require("bcrypt");
const User = require("../models/users.js");
const signUpvalidator = require("../utils/validator.js");
const ExpressError = require("../utils/ExpressErrorHandler.js");
const USER_SAFE_DATA = "firstName lastName about age skils gender photoUrl membershipType isPremium";

module.exports.signUpUser=async (req, res,next) => {
  const { firstName, lastName, password, email} = req.body;
  try {
    signUpvalidator(req);

    const existingUser = await User.findOne({email})
   if(existingUser){
    return next(new ExpressError("User already exists", 409));

   }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      firstName,
      lastName,
      email,
      
      password: hashedPassword
   
    });
  const newUser =  await user.save();
   const token = newUser.getJWT();

   res.cookie("token", token, {
         
          maxAge: 7 * 24 * 60 * 60 * 1000, 
        });
  
    res.json( {message:"Successfully added new user" , user: newUser});
  } catch (err) {
    
   

    next(err)
  }
}

module.exports.loginUser=async (req, res,next) => {
  try { 
 

    const { email, password } = req.body;

    const user = await User.findOne({ email });


    if (user) {
      // isCorrect = await bcrypt.compare(password, user.password);
      const isPasswordValid = await user.isPasswordValid(password);
      if (isPasswordValid) {
        //  const token=  jwt.sign(user.toObject(),"verySecret");
        const token = user.getJWT();
        const safeUser = await User.findOne({ email }).select(USER_SAFE_DATA);

        res.cookie("token", token, {
       
          maxAge: 7 * 24 * 60 * 60 * 1000, 
        });
        res.status(200).json(safeUser);
      } else {
        throw new ExpressError("Invalid email or password", 401);
      }
    } else {
      throw new ExpressError("Invalid email or password", 401);
    }
  } catch (err) {
     next(err)
  }
}


module.exports.logoutUser=async (req, res,next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
  });
  res.status(200).json("logout successfully");
};


module.exports.updateUser=async (req, res, next) => {
  try {
    const userId = req.params.userId.trim();
    const data = req.body;


    const notAllowedFields = ["email"];

    Object.keys(req.body).forEach((key) => {
      if (notAllowedFields.includes(key)) {
        throw new ExpressError("Email cannot be updated", 400);
      }
    });

    const allUsers = await User.findByIdAndUpdate(userId, data, { new: true });
    res.status(200).json(allUsers);
  } catch (err) {
    next(err);
  }
}


module.exports.deleteUser=async (req, res, next) => {
 
  try {
    const userId = req.params.userId.trim();
    const user = await User.findById(userId);
    if (user) {
      await User.findByIdAndDelete(userId);

      res.status(200).json("User Successfully Deleted");
    } else {
      res.status(200).json("User dose not exist,it may already deleted");
    }
  } catch (err) {
    next(err);
  }
}






