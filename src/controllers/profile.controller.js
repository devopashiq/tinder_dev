const bcrypt = require("bcrypt");
const profileEditeValidator = require("../utils/profileValidator");

module.exports.viewProfile = async (req, res) => {
  try {
    const user = req.user;

    res.status(200).send(user);
  } catch (err) {
    res.status(500).send("Error: " + err.message);
  }
};

module.exports.editProfile = async (req, res, next) => {
  try {
    if (!profileEditeValidator(req)) {
      throw new Error("Contians Invalid Feilds");
    }

    const loggedUser = req.user;
    const updateUser = req.body;

    Object.keys(updateUser).forEach((key) => {
      loggedUser[key] = updateUser[key];
    });

    const data = await loggedUser.save();

    res.status(200).json({
      msg: "updated the profile successfully",
      data,
    });
  } catch (err) {
    next(err);
  }
};

module.exports.changePassword = async (req, res) => {
  try {
    const user = req.user;

    const { currentPassword, newPassword } = req.body;

    const isPasswordValid = await user.isPasswordValid(currentPassword);

    if (isPasswordValid) {
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      user.password = hashedPassword;
      await user.save();

      res.status(200).send("password chnaged");
    } else {
      throw new Error("invalid passwords");
    }
  } catch (err) {
    res.status(500).send("Error: " + err.message);
    console.log(err);
  }
};
