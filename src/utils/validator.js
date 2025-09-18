
const validator = require("validator");
function signUpvalidator(req){
    const {firstName,lastName,password,email,age} = req.body

    if(!(firstName &&firstName.length>3)){
        throw new Error("Invalid First name")

    }else if(!validator.isEmail(email)){

    throw new Error("Invalid Email")
  }else if(!validator.isStrongPassword(password)){
    throw new Error 
    ("Not Strong password")
  }

}

module.exports =signUpvalidator