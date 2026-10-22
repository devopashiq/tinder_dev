class ExpressError extends Error{



    constructor(message,status){
        super(message)
        this.name = "ExpressError";
        this.status=status;
        this.isOperational = true;
        Error.captureStackTrace(this,this.constructor);
    }

    
}



module.exports = ExpressError


