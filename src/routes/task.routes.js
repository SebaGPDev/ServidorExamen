const router = require("express").Router();
const {
  checkTasks,
  createTask,
  updateTask,
  deleteTask,
} = require("../controllers//task.controller");
const validateJWT = require("../middleware/validateJWT");

router.get("/tasks", [validateJWT], checkTasks);
router.post("/task", [validateJWT], createTask);
router.put("/task/:id", [validateJWT], updateTask);
router.delete("/task/:id", [validateJWT], deleteTask);

module.exports = router;
