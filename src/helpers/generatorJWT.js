const jwt = require("jsonwebtoken");

const generateJWT = (uid) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      { uid },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "5h",
      },
      (err, token) => {
        if (err) {
          reject("An error occurred generating token");
        }
        resolve(token);
      }
    );
  });
};

module.exports = generateJWT;
