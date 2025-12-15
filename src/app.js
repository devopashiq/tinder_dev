const express = require("express");
const cookieParser = require('cookie-parser');
const jwt = require("jsonwebtoken");
const cors =require('cors')
const { connection } = require("mongoose");







const connectDB = require("./config/database.js");
const User = require("./models/users.js");

const {userAuth}= require("../src/middlewares/auth.js");

const authRouter= require("./routes/auth.route.js");
const profileRouter= require("./routes/profile.route.js");
const requestRouter = require("./routes/request.route.js");
const userRouter = require("./routes/user.route.js");
const mongoErrorHandling = require("./middlewares/mongoErrorHandling.js");

const app = express();
app.use(cors({
  origin: (origin, cb) => cb(null, true),
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());




app.use("/",authRouter);

 
app.use("/",profileRouter);
app.use("/",requestRouter);
app.use("/",userRouter);

app.use(mongoErrorHandling)
 app.use((err, req, res, next) => {
  return res.status(400).json({
    message: err.message,
  });
});


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


app.post("/SendRequestConnection",userAuth,(req,res)=>{
  try{
    
    const user = req.user;
    console.log(user,"in the request connection");

    res.json(`${user.firstName} sending requests to you`)
    
    
  }catch(err){

  }
})


connectDB()
  .then(() => {
    console.log("Connected to MongoDB successfully!"),
      app.listen(7000, () => {
        console.log(`Server is Running Successfully in port 7000`);
      });

    console.log(connection.name);
  })
  .catch((err) => console.error("Error connecting to MongoDB:", err));
