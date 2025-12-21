const mongoose = require("mongoose");

const connectDB = async () => {
await  mongoose.connect(
      process.env.DB_CONNECTION_STRING,
  );
};

// connectDB()
//   .then(() => console.log("Connected to MongoDB successfully!"))
//   .catch((err) => console.error("Error connecting to MongoDB:", err));

module.exports =
  connectDB

