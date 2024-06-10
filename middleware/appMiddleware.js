//middleware - function

const appMiddleware = (req, res, next) => {
  console.log("Inside app specicific middleware");
  next();
};

module.exports = appMiddleware;
