
const express = require("express");
const cookieParser = require("cookie-parser");

const cors = require("cors");


require("dotenv").config();

require("./utils/cronJob.js");




const authRouter = require("./routes/auth.route.js");
const profileRouter = require("./routes/profile.route.js");
const requestRouter = require("./routes/request.route.js");
const userRouter = require("./routes/user.route.js");


const chatRouter = require("./routes/chat.route.js");
const paymentRouter = require("./routes/payment.route.js");

const app = express();
app.use("/webhook/razorpay", express.raw({ type: "application/json" }));

app.use(express.json());

app.use(cookieParser());
app.use(
  cors({
    origin:["https://tinder-dev-frontend-dun.vercel.app","http://localhost:5173"],
    credentials: true,
  })
); 


app.use("/auths", authRouter);
app.use("/profiles", profileRouter);
app.use("/requests", requestRouter);
app.use("/users", userRouter);
app.use("/chats", chatRouter);
app.use("/payments", paymentRouter);

// app.use(mongoErrorHandling);

//Error middleWare





app.use((err, req, res, next) => {
  return res.status(err.status ||500).json({
    message: err.message,
  });
});

module.exports=app

 