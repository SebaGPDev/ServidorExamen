const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

const validateJWT = async (req, res, next) => {
  let auth = req.headers.authorization

  if (!auth) {
    return res.status(401).json({
      msg: "Error de autenticación - No hay token en la petición",
    });
  }

  try {
    const { uid } = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await User.findById(uid);

    if (!user) {
      return res.status(401).json({
        error: "Token no válido - usuario no existe en BD",
      });
    }

    if (!user.isActive) {
      return res.status(401).json({
        msg: "Token no válido - usuario con estado false",
      });
    }

    req.user = user;

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      msg: "Error de autenticación - Token no válido",
    });
  }
};

module.exports = validateJWT;
