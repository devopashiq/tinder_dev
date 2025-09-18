const mongoose = require("mongoose");

const connectDB = async () => {
await  mongoose.connect(
     "mongodb+srv://mhdashiq88:j0HD4oKiKRCPoHxn@namastenode.re2lijx.mongodb.net/devTinder"
  );
};

// connectDB()
//   .then(() => console.log("Connected to MongoDB successfully!"))
//   .catch((err) => console.error("Error connecting to MongoDB:", err));

module.exports =
  connectDB

