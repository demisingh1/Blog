const jwt = require("jsonwebtoken");
const auth = (req, res, next) => {
  // let token = req.headers.authorization.split(" ")[1];
  let {token} = req.cookies;
  // console.log(token);
  if (!token) {
    return res.status(400).json({ message: "Un Authorization" });
  }
  try {
    let tokenVeryfy = jwt.verify(token, process.env.SECRET_KEY);
    console.log(tokenVeryfy);
    req.id = tokenVeryfy.id;
    next();
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};
module.exports = { auth };
