const express = require("express");
const router = express.Router();

const { userAuth } = require("../middlewares/auth");
const profileEditeValidator = require("../utils/profileValidator");

router.get("/profile/view", userAuth, (req, res) => {
  try {
    const user = req.user;

    res.status(200).send(user);
  } catch (err) {
    res.status(500).send("Error: " + err.message);
  }
});

router.patch("/profile/edit", userAuth,async (req, res) => {
  try {
    if (!profileEditeValidator(req)) {
      throw new Error("Contians Invalid Feilds");
    }

    const loggedUser = req.user;
    const updateUser= req.body;
    
    console.log(loggedUser,"before");
    
    Object.keys(updateUser).forEach(key=>{
        loggedUser[key]=updateUser[key]
    })

  await loggedUser.save();


  res.status(200).send("updated the profile successfully")




    
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
});

module.exports = router;
