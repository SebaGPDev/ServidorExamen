const router = require("express").Router();

const {
  obteinUsers,
  registerUser,
  updateUser,
  deleteUser,
} = require("../controllers/users.controller");
const validateJWT = require("../middlewares/validateJWT");

router.get("/user", [validateJWT], obteinUsers);
router.post("/register", registerUser);
router.put("/user",[validateJWT], updateUser);
router.delete("/user",[validateJWT], deleteUser);

module.exports = router;
