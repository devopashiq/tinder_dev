const cookie = require("cookie");
const socket = require("socket.io");
const ExpressError = require("../utils/ExpressErrorHandler");
const chatModal = require("../models/chat");
const jwt = require("jsonwebtoken");
const User = require("../models/users");
const USER_SAFE_DATA = "firstName lastName about age skills gender photoUrl";

const onlineUsers = new Map();
const ActiveChats = new Map();

const initializeSocket = (server) => {
  const io = socket(server, {
    cors: {
      origin: ["http://localhost:5173"],
      credentials: true,
    },
  });

  io.use(async (socket, next) => {
    try {
      const rawCookie = socket.handshake.headers.cookie;

      if (!rawCookie) {
        return next(
          new ExpressError(
            '"Authentication required. Please login again."',
            401,
          ),
        );
      }

      const cookies = cookie.parse(rawCookie);
      const token = cookies.token;

      if (!token) {
        return next(new ExpressError("Token not Found", 401));
      }

      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      const { _id } = decodedToken;

      const user = await User.findById({ _id }).select(USER_SAFE_DATA);
      if (!user) {
        return next(new ExpressError("User not found", 401));
      }
     
      socket.user = user;
      next();
    } catch (err) {
      console.log(err);

      next(new ExpressError(err.message, 500));
    }
  });

  io.on("connection", async (socket) => {
    onlineUsers.set(socket.user._id.toString(), socket.id);
    io.emit("online-users", Array.from(onlineUsers.keys()));



    socket.on("joinChat", async ({ targetUserId }) => {
      const userId = socket.user._id.toString();
      const targetId = targetUserId.toString();
      const roomId = [userId, targetId].sort().join("-");

      socket.join(roomId);

      if (!ActiveChats.has(roomId)) {
        ActiveChats.set(roomId, new Set());
      }

      ActiveChats.get(roomId).add(userId);

      io.to(roomId).emit("userjoined", userId);

      let chat = await chatModal.findOne({
        participants: {
          $all: [userId, targetId],
        },
      });
      if (chat) {
        const chatId = chat._id;
     

        await chatModal.updateOne(
          {
            _id: chatId,
          },
          {
            $set: {
              "message.$[elem].status": "seen",
              "message.$[elem].seenAt": new Date(),
            },
          },
          {
            arrayFilters: [
              {
                "elem.senderId": { $ne: userId },
                "elem.status": { $ne: "seen" },
              },
            ],
          },
        );
      }
    });

    socket.on("sendMessage", async ({ targetUserId, newmessages }) => {
      const roomId = [socket.user._id.toString(), targetUserId.toString()]
        .sort()
        .join("-");

      let status = "sent";

      if (
        ActiveChats.has(roomId) &&
        ActiveChats.get(roomId).has(targetUserId.toString())
      ) {
        status = "seen";
      } else if (onlineUsers.has(targetUserId.toString())) {
        status = "delivered";
      }

      try {
        const userId = socket.user._id.toString();
        const targetId = targetUserId.toString();

        let chat = await chatModal.findOne({
          participants: {
            $all: [userId, targetId],
          },
        });

        if (!chat) {
          chat = new chatModal({
            participants: [userId, targetId],
            message: [],
          });
        }

        chat.message.push({
          senderId: userId,
          text: newmessages,
          status,
          seenAt: status === "seen" ? new Date() : null,
        });

       const chatResult = await chat.save();
       const message = chatResult.message[chatResult.message.length-1]
       

        io.to(roomId).emit("chatMessage", {
          text: message.text,
          userId: message.senderId.toString(),
          status: message.status,
          seenAt: message.seenAt,
          createdAt: message.createdAt
      

        });
      } catch (err) {
        console.log(err);
      }
    });


    socket.on('UserTyping',async ({typing,targetUserId})=>{
       const roomId = [socket.user._id.toString(), targetUserId.toString()]
        .sort()
        .join("-");
     
      
      socket.to(roomId).emit('typing',typing)
    })
 






    socket.on("disconnect", async () => {
    
      socket.user.lastSeen = new Date();
      const result = await socket.user.save();

      onlineUsers.delete(socket.user._id.toString());

      for (const [roomId, users] of ActiveChats) {
        users.delete(socket.user._id.toString());
        if (users.size === 0) {
          ActiveChats.delete(roomId);
        }
      }
      io.emit("online-users", Array.from(onlineUsers.keys()));
    });
  });
};

module.exports = { initializeSocket, onlineUsers };
