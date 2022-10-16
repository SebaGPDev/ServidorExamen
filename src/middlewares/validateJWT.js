const jwt = require("jsonwebtoken");
const UserModel = require("../models/Users");

const validateJWT = async (req, res, next) => {
  let auth = req.headers.authorization;

  if (!auth) {
    return res.status(401).json({
      msg: "Authentication error (No token in request)",
    });
  }

  try {
    const { uid } = jwt.verify(auth, process.env.JWT_SECRET_KEY);
    const user = await UserModel.findById(uid);

    if (!user) {
      return res.status(401).json({
        error: "Authentication error (user does not exist in db)",
      });
    }

    if (!user.isActive) {
      return res.status(401).json({
        msg: "Authentication error (user false)",
      });
    }

    req.user = user;

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      msg: "Authentication Error (Invalid Token)",
    });
  }
};

module.exports = validateJWT;
