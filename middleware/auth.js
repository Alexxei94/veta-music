const config = require("config");
const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  const token = req.header("x-auth-token");

  // check for token
  if (!token) {
    return res.status(401).json({ msg: "No token, access denied" });
  }

  try {
    // Varify token
    const tokenDecoded = jwt.verify(token, config.get("jwtSecret"));
    console.log("tokenDecoded", tokenDecoded);
    // Add user from token
    req.user = tokenDecoded;
    next();
  } catch (e) {
    res.status(400).json({ err: e });
  }
}

module.exports = auth;
