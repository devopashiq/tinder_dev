const bcrypt = require("bcrypt");
const profileEditeValidator = require("../utils/profileValidator");
const ExpressError = require("../utils/ExpressErrorHandler");

module.exports.viewProfile = async (req, res, next) => {
  try {
    const user = req.user;

    res.status(200).send(user);
  } catch (err) {
    next(err);
  }
};

module.exports.editProfile = async (req, res, next) => {
  try {
    if (!profileEditeValidator(req)) {
      throw new ExpressError("Profile contains fields that cannot be updated", 400);
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

module.exports.changePassword = async (req, res, next) => {
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
      throw new ExpressError("Current password is incorrect", 401);
    }
  } catch (err) {
    next(err);
  }
};
