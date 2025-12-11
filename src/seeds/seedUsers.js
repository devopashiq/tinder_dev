
const {users2 : users} =require("../seeds/helper");
const bcrypt = require("bcrypt");
const User = require("../models/users.js");
const   connectDB=require('../config/database.js')

connectDB()
  .then(() => {
    console.log("Connected to MongoDB successfully!"),
    //   app.listen(7000, () => {
    //     console.log(`Server is Running Successfully in port 7000`);
    //   });
    
seedUsers()

    console.log(connection.name);
  })
  .catch((err) => console.error("Error connecting to MongoDB:", err));


async function seedUsers(){

    try{

        
    for(let i=0;i<users.length;i++){
        const userData= users[i];
        // console.log(userData);
        
        
            const hashedPassword = await bcrypt.hash(userData.password, 10);
        
            const user = new User({
                ...userData,
                password: hashedPassword,
            });

            // console.log(user);
            
            await user.save();
    
    
    
    }

    }catch(err){  
        console.log(err);
        
      }





}

