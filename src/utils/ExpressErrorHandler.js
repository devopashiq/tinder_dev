class ExpressError extends Error{



    constructor(message,status){
        super(message)
        this.status=status;
        this.isOperatioanl
        Error.captureStackTrace(this,this.constructor);
    }

    
}



module.exports = ExpressError


