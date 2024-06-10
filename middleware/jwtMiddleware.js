const jwt = require("jsonwebtoken");

const jwtMiddleware = (req, res, next) => {
  console.log("Inside jwt middleware");
  const token = req.headers["authorization"].split(" ")[1];
  console.log(token);
  try {
    const jwtResponse = jwt.verify(token, "superscretjey");
    req.payload = jwtResponse.userId;
    console.log(jwtResponse);
    next();
  } catch (error) {
    res.status(401).json(`Authorization failed due to ${error}`);
  }
};

module.exports = jwtMiddleware;
