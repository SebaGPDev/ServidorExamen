const jwt = require("jsonwebtoken");

const generateJWT = (iud) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      iud,
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "5h",
      },
      (err, token) => {
        if (err) {
          console.log(err);
          reject("An error occurred generating token");
        }
        resolve(token);
      }
    );
  });
};
module.exports = generateJWT;
