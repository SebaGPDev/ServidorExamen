const User = require("../models/Users");
const task = require("../models/Tasks");
const bcrypt = require("bcrypt");
const ctrlUser = {};

ctrlUser.obteinUsers = async (req, res) => {
  const status = await User.findOne({ isActive: true });
  return res.json({
    status,
  });
};

ctrlUser.registerUser = async (req, res) => {
  const { username, password: passwordReceived } = req.body;
  const passwordHash = bcrypt.hashSync(passwordReceived, 10);

  const newUser = new User({
    username,
    password: passwordHash,
  });

  const user = await newUser.save();

  return res.json({
    status: "User registered successfully",
    user,
  });
};

ctrlUser.updateUser = async (req, res) => {
  const userId = req.user;
  const { username, password, ...otraInfo } = req.body;

  const passEncryp = bcrypt.hashSync(password, 10);
  const info = { username, password: passEncryp };

  try {
    const infoUpdate = await User.findByIdAndUpdate(userId, info, {
      new: true,
    });

    return res.json({
      status: "User has been update",
    });
  } catch (error) {
    return res.status(500).json({
      status: "An error occurred while trying to update user",
    });
  }
};

ctrlUser.deleteUser = async (req, res) => {
  const userId = req.user._id;

  try {
    const findTasks = await task.find({ userId: userId });

    if (findTasks) {
      const taskRemove = await task.deleteMany({ userId: userId });
    }
    const infoRemove = await User.findByIdAndUpdate(userId, {
      isActive: false,
    });
    return res.json({
      status: "User has been removed successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: "An error occurred while trying to delete User",
    });
  }
};

module.exports = ctrlUser;
