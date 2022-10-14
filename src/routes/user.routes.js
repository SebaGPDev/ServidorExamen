const router = require("express").Router();

const {
  checkUsers,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/user.controller");
const validateJWT = require("../middleware/validateJWT");

router.get("/user", [validateJWT], checkUsers);
router.post("/register", createUser);
router.put("/user", [validateJWT], updateUser);
router.delete("/user", [validateJWT], deleteUser);

module.exports = router;
