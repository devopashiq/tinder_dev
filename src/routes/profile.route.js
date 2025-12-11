const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const mongoErrorHandling = require('../middlewares/mongoErrorHandling')

const { userAuth } = require("../middlewares/auth");
const profileEditeValidator = require("../utils/profileValidator");

const USER_SAFE_DATA = "firstName lastName about age skills gender photoUrl";

router.get("/profile/view", userAuth,async (req, res) => {
  try {
    const user = req.user;
  



    res.status(200).send(user);
  } catch (err) {
    res.status(500).send("Error: " + err.message);
  }
});

router.patch("/profile/edit", userAuth, async (req, res,next) => {
  try {
    if (!profileEditeValidator(req)) {
      throw new Error("Contians Invalid Feilds");
    }

    const loggedUser = req.user;
    const updateUser = req.body;
    

    console.log(loggedUser, "before");
    console.log(updateUser, "update");

    Object.keys(updateUser).forEach((key) => {
      loggedUser[key] = updateUser[key];
    });
 
   const data= await loggedUser.save();
   console.log(data);
   

    res.status(200).json({
      msg: "updated the profile successfully"
      ,data}
    );
  } catch (err) {
      next(err)
  }
});

router.patch("/profile/password", userAuth, async (req, res) => {
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

    //bycrpt compare
  } catch (err) {
    res.status(500).send("Error: " + err.message);
    console.log(err);
  }
});

module.exports = router;
