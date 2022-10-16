const TasksModel = require("../models/Tasks");

const taskCtrl = {};

taskCtrl.obteinTasks = async (req, res) => {
  const tasks = await TasksModel.find({ userId: req.user });

  return res.json(tasks);
};

taskCtrl.registerTask = async (req, res) => {
  const { title, description } = req.body;

  const newTask = new TasksModel({
    title,
    description,
    userId: req.user._id,
  });

  newTask.save();

  return res.json({
    status: "Your task has been registered successfully",
  });
};

taskCtrl.updateTask = async (req, res) => {
  const taskId = req.params.id;
  const UserId = req.user._id;
  console.log(UserId);

  const findTask = await TasksModel.findById(taskId);
  const { title, description, isDone } = req.body;

  const infoUpdate = { title, description };
  console.log(findTask.userId);

  try {
    if (findTask.userId.toString() != UserId.toString()) {
      return res.json({
        status: "The task belongs to another user",
      });
    }

    const infoTask = await TasksModel.findByIdAndUpdate(taskId, infoUpdate, {});
    if (!infoTask) {
      return res.json({
        status: "An error occurred while trying find task",
      });
    }

    return res.json({
      status: "Your task has been update successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "Your task could not be updated",
    });
  }
};

taskCtrl.deleteTask = async (req, res) => {
  const taskId = req.params.id;
  const UserId = req.user._id;

  const findTask = await TasksModel.findById(taskId);

  try {
    if (findTask.userId.toString() != UserId.toString()) {
      return res.json({
        status: "The task belongs to another user",
      });
    }

    const delTask = await TasksModel.findByIdAndRemove(taskId);

    res.json({
      status: "Your task has been deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.json({
      status: "An error occurred while trying to delete task",
    });
  }
};

module.exports = taskCtrl;
