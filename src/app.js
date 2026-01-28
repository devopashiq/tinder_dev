const { createServer } = require("http");
const express = require("express");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const { connection } = require("mongoose");

require("dotenv").config();

require("./utils/cronJob.js");

const connectDB = require("./config/database.js");
const User = require("./models/users.js");

const { userAuth } = require("../src/middlewares/auth.js");

const authRouter = require("./routes/auth.route.js");
const profileRouter = require("./routes/profile.route.js");
const requestRouter = require("./routes/request.route.js");
const userRouter = require("./routes/user.route.js");
const mongoErrorHandling = require("./middlewares/mongoErrorHandling.js");
const {initializeSocket} = require("./utils/socket.js");
const chatRouter = require("./routes/chat.route.js");
const PaymentRouter = require("./routes/payment.route.js");

const app = express();
app.use("/webhook/razorpay", express.raw({ type: "application/json" }));

app.use(express.json());

app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
); 

const server = createServer(app);
initializeSocket(server); 

app.use("/", authRouter);

app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);
app.use("/", chatRouter);
app.use("/", PaymentRouter );


app.use(mongoErrorHandling);

//Error middleWare

app.use((err, req, res, next) => {
  return res.status(err.status ||500).json({
    message: err.message,
  });
});

connectDB()
  .then(() => {
    console.log("Connected to MongoDB successfully!"),
      server.listen(7000, () => {
        console.log(`Server is Running Successfully in port 7000`);
      });

    console.log(connection.name);
  })
  .catch((err) => console.error("Error connecting to MongoDB:", err));
