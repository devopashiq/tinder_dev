
const validator = require("validator");
const ExpressError = require("./ExpressErrorHandler");
function signUpvalidator(req){
    const {firstName,lastName,password,email} = req.body

    if(typeof firstName !== "string" || firstName.trim().length <= 3){
        throw new ExpressError("Invalid first name", 400)

    }else if(typeof email !== "string" || !validator.isEmail(email)){

    throw new ExpressError("Invalid email", 400)
  }else if(typeof password !== "string" || !validator.isStrongPassword(password)){
    throw new ExpressError("Password is not strong enough", 400)
  }

}

module.exports =signUpvalidator
