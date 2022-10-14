// const { verifyToken } = require("./validateJWT");

// const checkAuth = async (req, res, next) => {
//   try {
//     const token = req.headers.authorization;
//     if (!token) {
//       return res.status(409).send({ error: "Invalid authorization token" });
//     }

//     const accessToken = token.split(" ").pop();

//     const tokenData = await verifyToken(accessToken);
//     if (tokenData._id) {
//       next();
//     } else {
//       res.status(409);
//       res.send({ error: "You do not have access allowed" });
//     }
//   } catch (e) {
//     console.log(e);
//     res.status(409);
//     res.send({ error: "You do not have access allowed" });
//   }
// };

// module.exports = checkAuth;
