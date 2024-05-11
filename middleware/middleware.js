const jwt = require("jsonwebtoken");

function verifyJWT(req, res, next) {
  const token = req.header["authorization"];
  if (!token) {
    return res.status(401).json({ message: "access denied!" });
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, data) => {
    if (err) {
      return res.status(401).json({ message: "Failed to authenticate token!" });
    }

    req.user = data;
    next();
  });
}

module.exports = verifyJWT;
