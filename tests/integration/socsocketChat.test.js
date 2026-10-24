const { createServer } = require("node:http");
const app = require("../../src/app");
const { initializeSocket } = require("../../src/utils/socket");
const { io: createClient } = require("socket.io-client");
const { Types } = require("mongoose");
const User = require("../../src/models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const connectionRequestmodel = require("../../src/models/connectionRequest");

const createUser = async (isPremium, count) => {
  const hashedPassword = await bcrypt.hash("Password@123", 10);

  const user = new User({
    firstName: "test frist",
    lastName: "test last",
    email: `testuser${count}@gmail.com`,
    isPremium: isPremium,
    password: hashedPassword,
  });
  const newUser = await user.save();

  const token = newUser.getJWT();

  return { token, id: newUser._id };
};

const createConnection = async (user1, user2, status) => {
  const connection = new connectionRequestmodel({
    fromUserId: user1,
    toUserId: user2,
    status: status,
  });

  await connection.save();
};

const emit = (c, event, payload) =>
  new Promise((resolve) => {
    return c.emit(event, payload, resolve);
  });

const join = (c, targetUserId) => emit(c, "joinChat", { targetUserId });

describe("Socket chat  test", () => {
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

  test("should join the chat if they have connection request accepted ", async () => {
    const { token: token1, id: id1 } = await createUser(true, 1);
    const { token: token2, id: id2 } = await createUser(true, 2);

    await createConnection(id1, id2, "accepted");

    socket = createClient(socketUrl, {
      reconnection: false,
      extraHeaders: {
        Cookie: `token=${token1}`,
      },
    });

    await new Promise((resolve, reject) => {
      socket.once("connect_error", () => {
        reject(new Error("Connection should have been Accepted"));
      });

      socket.once("connect", resolve);
    });

    const res = await join(socket, id2);
    console.log(res, "test ack form join chat");

    expect(res.message).toEqual("Successfully joined chat");

    expect(socket.connected).toBe(true);
  });
});
