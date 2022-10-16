const router = require("express").Router();
const {
  obteinTasks,
  registerTask,
  updateTask,
  deleteTask,
} = require("../controllers/tasks.controller");
const validateJWT = require("../middlewares/validateJWT");

router.get("/tasks", [validateJWT], obteinTasks);
router.post("/task", [validateJWT], registerTask);
router.put("/task/:id", [validateJWT], updateTask);
router.delete("/task/:id", [validateJWT], deleteTask);

module.exports = router;
