
require("dotenv").config();

const { createServer } = require("http");
const app = require("./app.js");
const connectDB = require("./config/database.js");
const { initializeSocket } = require("./utils/socket.js");

const server = createServer(app);

async function startServer() {
  try {
    await connectDB();

    initializeSocket(server);

    // require("./utils/cronJob.js");

    const PORT = process.env.PORT || 7000;

    server.listen(PORT, () => {
      console.log("Server running on port " + PORT);
    });
  } catch (error) {
    console.error("Server startup failed:", error);
  }
}

startServer();

module.exports = server;
