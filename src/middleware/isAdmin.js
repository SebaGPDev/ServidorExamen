const isAdmin = (req, res, next) => {
  if (req.user.Role !== "Si") {
    return res.status(401).json({
      message: "No autorizado - No eres administrador",
    });
  }
  next();
};
module.exports = isAdmin;
