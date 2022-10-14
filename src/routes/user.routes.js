const router = require("express").Router();

const {
  checkUsers,
  postUser,
  updateUser,
  deleteUser,
} = require("../controllers/user.controller");
const validateJWT = require("../middleware/validateJWT");

router.get("/user", [validateJWT], checkUsers);
router.post("/register", postUser);
router.put("/user", [validateJWT], updateUser);
router.delete("/user", [validateJWT], deleteUser);

module.exports = router;
