const cookie = require('cookie')
const socket = require("socket.io");
const ExpressError = require("../utils/ExpressErrorHandler");
const chatModal = require("../models/chat");
const jwt = require("jsonwebtoken");
const User = require("../models/users");
const USER_SAFE_DATA = "firstName lastName about age skills gender photoUrl";




const initializeSocket = (server) => {
  const io = socket(server, {
    cors: {
      origin: ["http://localhost:5173"],
      credentials:true
    },
  });
  


  io.use(async(socket,next)=>{

    try{
      
    const rawCookie =socket.handshake.headers.cookie


    if(!rawCookie){
     return next(new ExpressError('"Authentication required. Please login again."',401))
    }
   
    const cookies = cookie.parse(rawCookie);
    const token =cookies.token
   
    if(!token){
      return next (new ExpressError ('Token not Found',401))
    }

    const decodedToken = jwt.verify(token,process.env.JWT_SECRET)
    const {_id} =decodedToken;

   const user= await User.findById({_id}).select(USER_SAFE_DATA)
   console.log(user);

    socket.user = user;
    next();

    }catch(err){
      console.log(err);
      
      next(new ExpressError(err.message,500))
    }

   
   
    
   
    
  })

  io.on("connection", (socket) => {
    console.log(socket.user, "a user is connected");
    console.log(socket);
    



    socket.on("joinChat", ({ userId, targetUserId, username }) => {
      console.log(userId, targetUserId, username);
      const roomId = [userId, targetUserId].sort().join("-");

      socket.join(roomId);
    });
    socket.on(
      "sendMessage",
      async ({ userId, targetUserId, username, newmessages }) => {
        const roomId = [userId, targetUserId].sort().join("-");
        io.to(roomId).emit("chatMessage", { username, text: newmessages, userId });

        try {
          let chat = await chatModal.findOne({
            participants: {
              $all: [userId, targetUserId],
            },
          });

          if (!chat) {
            chat = new chatModal({
              participants: [userId, targetUserId],
              message: [],
            });
          }

          chat.message.push({
            senderId: userId,
            text: newmessages,
          });

          await chat.save();
        } catch (err) {
          console.log(err);
        }
      }
    );

    socket.on("disconnect", () => {
      console.log("A user disconnected");
    });
  });
};

module.exports = initializeSocket;
