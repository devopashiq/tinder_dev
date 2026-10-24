const { createServer } = require("node:http");
const app = require("../../src/app");
const { initializeSocket } = require("../../src/utils/socket");
const { io: createClient } = require("socket.io-client");
const { Types } = require("mongoose");
const User = require("../../src/models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createUser = async (isPremium,expired=false) => {
  const hashedPassword = await bcrypt.hash("Password@123", 10);

  const user = new User({
    firstName: "test frist",
    lastName: "test last",
    email: "test@gmail.com",
    isPremium: isPremium,
    password: hashedPassword,
  });
  const newUser = await user.save();
 
  if(expired){
    return expiredToken(newUser)
  } 
  const token = newUser.getJWT();

  return token;
};

const expiredToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      exp: Math.floor(Date.now() / 1000) - 60,
    },
    process.env.JWT_SECRET,
  );
};

describe("Socket.IO authentication middleware", () => {
  let httpServer;
  let ioServer;
  let socket;
  let socketUrl;

  beforeAll(async () => {
    httpServer = createServer(app);
    ioServer = initializeSocket(httpServer);

    await new Promise((resolve, reject) => {
      httpServer.once("error", reject);
      httpServer.listen(0, "127.0.0.1", resolve);
    });

    const { port } = httpServer.address();
    socketUrl = `http://127.0.0.1:${port}`;

    console.log(socketUrl)
  });

  afterEach(() => {
    if (socket) {
      socket.disconnect();
      socket = null;
    }
  });

  afterAll(async () => {
    await new Promise((resolve) => ioServer.close(resolve));
  });

  test("should reject a connection without a token", async () => {
    socket = createClient(socketUrl, {
      reconnection: false,
    });

    const error = await new Promise((resolve, reject) => {
      socket.once("connect_error", resolve);
      socket.once("connect", () => {
        reject(new Error("Connection should have been rejected"));
      });
    });

    expect(error.message).toBe("Authentication required. Please login again.");
  });

  test("shoud accept a connection with valid token", async () => {
    const token = await createUser(true);

    socket = createClient(socketUrl, {
      reconnection: false,
      extraHeaders: {
        Cookie: `token=${token}`,
      },
    });

    await new Promise((resolve, reject) => {
      socket.once("connect_error", () => {
        reject(new Error("Connection should have been Accepted"));
      });
      socket.once("connect", resolve);
    });

    expect(socket.connected).toBe(true);
  });

  test("should not accept a connection  if user is not premium ", async () => {
    const token = await createUser(false);

    socket = createClient(socketUrl, {
      reconnection: false,
      extraHeaders: {
        Cookie: `token=${token}`,
      },
    });

    const error = await new Promise((resolve, reject) => {
      socket.once("connect_error", resolve);
      socket.once("connect", () => {
        reject(new Error("Connection should have been Rejected"));
      });
    });

    expect(error.message).toBe("You are not a premium user");
  });

  test("shoud not  accept a connection with expired token", async () => {
    const token =await createUser(true,true);
   

    socket = createClient(socketUrl, {
      reconnection: false,
      extraHeaders: {
        Cookie: `token=${token}`,
      },
    });

   const error= await new Promise((resolve, reject) => {
        socket.once("connect",() => {
        reject(new Error("Connection should have been Rejected"));
      });
      socket.once("connect_error", resolve );
    
    });

    expect(error.message).toBe("Token is expired");
  });


  test("shoud not  accept a connection with invalid token", async () => {
    const token ='this.is.not-a-valid-jwt'
   

    socket = createClient(socketUrl, {
      reconnection: false,
      extraHeaders: {
        Cookie: `token=${token}`,
      },
    });

   const error= await new Promise((resolve, reject) => {
         socket.once("connect",() => {
        reject(new Error("Connection should have been Rejected"));
      });
      socket.once("connect_error", resolve );
    
    });

    expect(error.message).toBe("Invalid token");
  });
});
