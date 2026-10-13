const {signUpUser,loginUser,logoutUser,updateUser,deleteUser} = require('../controllers/auth.controller.js')
const express = require("express");

const router = express.Router();




router.post("/signup",signUpUser);

router.post("/login",loginUser );

router.post("/logout",logoutUser );

router.patch("/user/:userId", updateUser);

router.delete("/user/:userId",deleteUser );

module.exports = router;
