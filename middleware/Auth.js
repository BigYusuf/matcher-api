const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

//setting up config file
dotenv.config();

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

//validate from cookie
const isAuth = async (req, res, next) => {
  const token = req.cookies["accessToken"];
  const authorization = req?.headers?.authorization;
  if (token) {
    const validateToken = jwt.decode(token, process.env.JWT_SECRET);

    const expiredToken = Date.now() >= validateToken.exp * 1000;
    if (expiredToken) {
      res
        .status(400)
        .clearCookie("accessToken")
        .send({ message: "Token Expired, You need to Login" });
    } else if (!expiredToken && validateToken) {
      req.user = validateToken;
      next();
    } else {
      res.status(403).send({ message: "Invalid Token" });
    }
  } else if (authorization) {
    let token = authorization.slice(7, authorization.length); // Bearer XXXXXX
    jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        res.status(403).send({ message: "Invalid Token" });
      } else {
        req.user = decode;
        next();
      }
    });
  } else {
    res.status(401).send({ message: "No Token, you need to Login" });
  }
};

const isAdmin = async (req, res, next) => {
  if (req.user && req.user?.role === "admin") {
    next();
  } else {
    res.status(401).send({ message: "Invalid Admin Token" });
  }
};

module.exports = {
  generateToken,
  isAuth,
  isAdmin,
};
