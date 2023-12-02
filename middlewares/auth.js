const jwt = require("jsonwebtoken");
const auth = (req, res, next) => {
  let token = req.headers.authorization.split(" ")[1];
  console.log(token);
  if (!token) {
    return res.json({ message: "Un Authorization" });
  }
  try {
    let tokenVeryfy = jwt.verify(token, process.env.SECRET_KEY);
    console.log(tokenVeryfy);
    req.id = tokenVeryfy.id;
    next();
  } catch (error) {
    return res.json({ message: error });
  }
};
module.exports = { auth };
