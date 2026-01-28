
const {CronJob} = require('cron');
const connectionRequestmodel=require('../models/connectionRequest');
const { subDays,startOfDay,endOfDay } = require("date-fns");




const job = new CronJob('* * * * * *',async function(){



const yesterday= subDays(new Date(),1);
//  console.log('checking cron job');
 


const startOfYesterday =startOfDay(yesterday);
const endOfYesterday=endOfDay(yesterday);
 try{
    const result = await connectionRequestmodel.find({
        status:'interested'
    })

   //  console.log(result);
    


 }catch(err){
   //  console.log(err);
    
 }





 



})


// job.start()
 
 