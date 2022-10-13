const jwt = require("jsonwebtoken");

const tokenSing = async (user) => {
  //   return new Promise((resolve, reject) => {
  return jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET_KEY, {
    expiresIn: "5h",
  });
  //   });
};

module.exports = {tokenSing};