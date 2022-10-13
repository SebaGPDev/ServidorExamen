const { verifyToken } = require("../middleware/validateJWT");
const userModel = require("../models/User");

const checkRoleAuth = (roles) => async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ").pop();
    const tokenData = await verifyToken(token);
    const userData = await userModel.findById(tokenData._id);

    if ([].concat(roles).includes(userData.role)) {
      next();
    } else {
      res.status(409);
      res.send({ error: "You do not have access allowed" });
    }
  } catch (e) {
    console.log(e);
    res.status(409);
    res.send({ error: "You do not have access allowed" });
  }
};

module.exports = checkRoleAuth;
