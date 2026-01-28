const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const validator = require("validator");

function capitalizeFirstLetter(value) {
  if (!value) return value;

  const cleaned = value.trim(); // remove extra spaces
  const final =
    cleaned.charAt(0).toUpperCase() + cleaned.slice(1).toLowerCase();

  return final;
}

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      minLength: [3, "First name must be at least 3 characters long"],
      maxLength: 10,
      set: capitalizeFirstLetter,
      required: true,
    },
    lastName: {
      type: String,
      minLength: 1,
      maxLength: 10,
      set: capitalizeFirstLetter,
    },
    about: { type: String, default: "This is default About" ,maxLength:250},
    email: {
      type: String,
      lowercase: true,
      trim: true,
      required: [true, "Email is required"],
      unique:  true,
      
    },
    password: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      min: [18, "user must be 18 or older"],
     
     
    }, 
    gender: {
      type: String,
      enum: {values:["male", "female", "other"],
        message: "{VALUE} is invalid gender type",
         
      },
   
      // validate: (v) => {
      //   const cleaned = v.toLowerCase();
      //   if (!["male", "female", "other"].includes(cleaned)) {
      //     throw new Error("Please set gender in male,female,other");
      //   }
      // },
    
    },
     photoUrl: {
      type: String,
      default: "https://geographyandyou.com/images/user-profile.png",
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("Invalid Photo URL: " + value);
        }
      },
    },

    skils: {
      type: [String],
    },
    lastSeen:{
      type:Date,
      default:null
    }
  },
  { timestamps: true }
);

userSchema.methods.getJWT=  function(){
  
  const user = this;

 return token = jwt.sign({_id:user._id},"verySecret");
 


}

userSchema.methods.isPasswordValid= async function (inputPasswordByUser){
  const user=this;


  

const isPasswordValid =await bcrypt.compare(inputPasswordByUser, user.password);



return isPasswordValid

 
}

module.exports = mongoose.model("User", userSchema);
