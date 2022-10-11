const router = require("express").Router();
const {createNewTask} = require("../controllers/task.controller");

router.post("/task", createNewTask);

module.exports = router;