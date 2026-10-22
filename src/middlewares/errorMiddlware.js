const errorMiddleware = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  if (err.isOperational) {
    return res.status(err.status || 500).json({
      message: err.message,
    });
  }

  console.error(err);
  return res.status(500).json({
    message: "Error from our side",
  });
};



module.exports =errorMiddleware
