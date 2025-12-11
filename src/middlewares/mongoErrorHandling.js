  const mongoErrorHandling = ((err,req,res,next)=>{

    let message ='Somthing went wrong';

if (err.name === "ValidationError" && err.errors) {
    const messages = Object.keys(err.errors).map(
      (key) => err.errors[key].message
    );
    message = messages[0]; // send first validation error
  }
  else if (err.code ===11000 && err.keyValue){
    const field = Object.keys(err.keyValue)[0];
    message =`${field} already exists`
  }

 return next( new Error(message))


})

module.exports = mongoErrorHandling