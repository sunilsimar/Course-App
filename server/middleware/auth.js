const jwt = require("jsonwebtoken");
require("dotenv").config();

const secretKey = process.env.SECRET_KEY;

const authenticateJwt = (req, res, next) => {
  const authHeader = req.headers.authorization; //its in postman headers

  if (authHeader) {
    const token = authHeader.split(" ")[1]; //because in authorization there is a bearer+ string(we need only this)

    jwt.verify(token, secretKey, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

module.exports = {
  authenticateJwt,
  secretKey,
};
