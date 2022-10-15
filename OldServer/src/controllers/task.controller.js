const TasksModel = require("../models/task.model");
const taskCtrl = {};

taskCtrl.checkTasks = async (req, res) => {
  const tasks = await TasksModel.find({ userId: req.user });

  return res.json(tasks);
};

taskCtrl.createTask = async (req, res) => {
  const { title, description } = req.body;

  const newTask = new TasksModel({
    title,
    description,
    userId: req.user._id,
  });

  const task = await newTask.save();

  return res.json({
    Status: "Task created successfully",
    task,
  });
};

taskCtrl.updateTask = async (req, res) => {
  const taskId = req.params.id;
  const { title, description } = req.body;
  const dataUpdate = { title, description };

  try {
    const dataTask = await Tasks.findByIdAndUpdate(taskId, dataUpdate, {
      new: true,
    });

    if (!dataTask) {
      return res.json({
        Status: "Task not found or does not exist",
      });
    }

    return res.json({
      Status: "Task updated successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      Status: "An error has occurred",
    });
  }
};

taskCtrl.deleteTask = async (req, res) => {
  const taskId = req.params.id;
  const UserId = req.user._id;

  const findTask = await Tasks.findById(taskId);

  try {
    if (toString(findTask.userId) != toString(UserId)) {
      return res.json({
        Status: "You are not allowed to do this",
      });
    }

    const delTask = await Tasks.findByIdAndRemove(taskId, { isDone: true });
    res.json({
      Status: "The task was successfully deleted",
    });
  } catch (error) {
    console.log(error);
    res.json({
      Status: "An error has occurred",
    });
  }
};

module.exports = taskCtrl;
