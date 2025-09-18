const express = require("express");
const connectDB = require("./config/database.js");

const { connection } = require("mongoose");

const User = require("./models/users.js");

const signUpvalidator = require("./utils/validator.js");
const bcrypt = require("bcrypt");
const cookieParser = require('cookie-parser');

const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());
app.use(cookieParser());

//post

app.post("/signup", async (req, res) => {


  const { firstName, lastName, password, email, age, gender } = req.body;
  try {
    signUpvalidator(req);

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      firstName,
      lastName,
      email, 
      age,
      password: hashedPassword,
      gender,
    });
    await user.save();
    res.json("Successfully added new user");
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error in Adding new user", err: err.message });
    console.log(err.message);
  }
});

//get

app.get("/feed", async (req, res) => {
  try {
 

    const token = req.cookies.token
    
    const decoded = jwt.verify(token,"verySecret")
    console.log(decoded);
    
    const allUsers = await User.find({});

    res.status(200).json(allUsers);
  } catch (err) {
    res.status(500).json("Error in Getting all users", err);
    console.log(err);
    
  }
});
app.get("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (user) {
      isCorrect = await bcrypt.compare(password, user.password);
      if (isCorrect) {
       
        
       const token=  jwt.sign(user.toObject(),"verySecret");
       res.cookie("token",token);
        res.status(200).json(user);
      } else {
        throw new Error("Incorrect password");
      }
    } else {
      throw new Error("User not found");
    }
  } catch (err) {
    res.status(500).json("Error in Getting all usera" + err)
    ;
    console.log(err);
    
  }
});

//path

app.patch("/user/:userId", async (req, res) => {
  try {
    const userId = req.params.userId.trim();
    const data = req.body;

    console.log(userId);

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

//delete

app.delete("/user/:userId", async (req, res) => {
    console.log(req.cookies)
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

connectDB()
  .then(() => {
    console.log("Connected to MongoDB successfully!"),
      app.listen(7000, () => {
        console.log(`Server is Running Successfully in port 7000`);
      });

    console.log(connection.name);
  })
  .catch((err) => console.error("Error connecting to MongoDB:", err));
