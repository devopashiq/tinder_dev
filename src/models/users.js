const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

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
      minLength: 1,
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
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      validate: (v) => {
        if (v < 18) {
          throw new Error("User age cannot  be less than 18");
        }

        return v;
      },
      required: true,
    },
    gender: {
      type: String,
      required: true,
      validate: (v) => {
        const cleaned = v.toLowerCase();
        if (!["male", "female", "other"].includes(cleaned)) {
          throw new Error("please set gender in [male,female,other]");
        }
      },
      required: true,
    },

    skils: {
      type: [String],
    },
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
