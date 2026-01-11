const mongoose = require("mongoose");


//creating instance Schmema




const connectionRequestSchema = new mongoose.Schema({
  fromUserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'User',
    required: true
  
  },
  toUserId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref:'User',
  },
  status: {
    type: String,
  
    enum: {
      values: ["ignored", "interested", "accepted", "rejected"],
      message: "{VALUE} is invalid status type",
    },
  },
  
},{timestamps:true});


connectionRequestSchema.index({
  fromUserId :1,
  toUserId:1
})
//defining and modal based scheme we build


connectionRequestSchema.pre('save',function(next){

 const connectionRequest = this;

  if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
    return next(new Error("Cannot send request to yourself"));
  }



  next()

}) 

const connectionRequestmodel = new mongoose.model(
  "connectionRequest",
  connectionRequestSchema
);

module.exports = connectionRequestmodel;
