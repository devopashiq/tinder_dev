const ExpressError = require("../utils/ExpressErrorHandler");

const isPremiumUser = (req, res, next) => {
  if (!req.user?.isPremium) {
    return next(new ExpressError("You are not a premium user", 403));
  }

  next();
};



module.exports = isPremiumUser;
