const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

const validateJWT = async (req, res, next) => {
  let auth = req.get("authorization");

  if (!auth) {
    return res.status(401).json({
      msg: "Error de autenticación - No hay token en la petición",
    });
  }

  let token = auth.substring(7);

  try {
    const { uid } = jwt.verify(token, process.env.SECRET);
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
