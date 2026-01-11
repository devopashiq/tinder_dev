const express =require('express');
const chatModal = require('../models/chat');
const { userAuth } = require('../middlewares/auth');




const ChatRouter = express.Router();

 

ChatRouter.get("/chat/:targetUserId",userAuth,async(req,res,next)=>{
    const userId= req.user._id;
    const targetUserId= req.params.targetUserId

    try{
        let chat = await chatModal.findOne({
         participants: {
              $all: [userId, targetUserId],
            },
        }).populate({
            path:'message.senderId',
            select :"firstName lastName"
        })


        if(!chat){
            chat = new chatModal({
                 participants:[userId, targetUserId],
                 message:[]

            })

          await  chat.save()
        }


        res.json(chat);
        

        

    }catch(err){
        console.log(err);
        next(err)
        


    }

})



module.exports= ChatRouter;
