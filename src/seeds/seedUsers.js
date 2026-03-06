const { users2: users } = require("../seeds/helper");
const bcrypt = require("bcrypt");
const User = require("../models/users.js");
const connectDB = require("../config/database.js");

connectDB()
  .then(() => {
    (console.log("Connected to MongoDB successfully!"), seedUsers());
  })
  .catch((err) => console.error("Error connecting to MongoDB:", err));

async function seedUsers() {
  try {
    for (let i = 0; i < users.length; i++) {
      const userData = users[i];

      const hashedPassword = await bcrypt.hash(userData.password, 10);

      const user = new User({
        ...userData,
        password: hashedPassword,
      });

      await user.save();
    }
  } catch (err) {
    console.log(err);
  }
}
