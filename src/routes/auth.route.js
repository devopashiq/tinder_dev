const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const User = require("../models/users.js");

const signUpvalidator = require("../utils/validator.js");
const e = require("express");

const USER_SAFE_DATA = "firstName lastName about age skill gender photoUrl";

router.post("/signup", async (req, res) => {
  const { firstName, lastName, password, email} = req.body;
  try {
    signUpvalidator(req);

    const existingUser = await User.findOne({email})
   if(existingUser){
    return res.status(409).json({err:"Email Already Exists"})
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
    
    res
      .status(500)
      .json({ message: "Error in Adding new user", err: err.message });
    console.log(err);
  }
});

router.post("/login", async (req, res) => {
  try { 
    console.log(req.body);

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
        throw new Error("Incorrect password");
      }
    } else {
      throw new Error("User not found");
    }
  } catch (err) {
    res.status(500).json( {message:"Error in Getting all usera" , err: err.message});
    console.log("Error in Getting all usera", err);
  }
});

router.post("/logout", async (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
  });
  res.status(200).json("logout successfully");
});

router.patch("/user/:userId", async (req, res) => {
  try {
    const userId = req.params.userId.trim();
    const data = req.body;

    // console.log(userId);

    const notAllowedFields = ["email"];

    Object.keys(req.body).forEach((key) => {
      if (notAllowedFields.includes(key)) {
        throw new Error("Contain the fields that are not allowed to update");
      }
    });

    const allUsers = await User.findByIdAndUpdate(userId, data, { new: true });
    res.status(200).json(allUsers);
  } catch (err) {
    res.status(500).send("Error in Updating a users" + err);
  }
});

router.delete("/user/:userId", async (req, res) => {
  // console.log(req.cookies);
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
    res.status(500).json("Error in Deleting user" + err.message);
  }
});

module.exports = router;
