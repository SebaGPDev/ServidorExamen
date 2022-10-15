const UserModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const userCtrl = {};

userCtrl.checkUsers = async (req, res) => {
  const resp = await UserModel.findOne({ isActive: true });
  return res.json({
    status: "usuarios activo",
    resp,
  });
};

userCtrl.postUser = async (req, res) => {
  const { username, email, password: passRecibida } = req.body;
  const passEncriptada = bcrypt.hashSync(passRecibida, 10);

  const newUser = new UserModel({
    username,
    email,
    password: passEncriptada,
  });

  const user = await newUser.save();

  return res.json({
    msg: "usuario cargado correctamente",
    user,
  });
};

userCtrl.updateUser = async (req, res) => {
  const userId = req.user;
  const { username, password, _id, ...other } = req.body;

  const passwordHash = bcrypt.hashSync(password, 10);
  const data = { username, password: passwordHash, isActive };

  try {
    const infoUpdate = await User.findByIdAndUpdate(userId, data, {
      new: true,
    });

    return res.json({
      status: "User updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: "An error occurred updating",
    });
  }
};

userCtrl.deleteUser = async (req, res) => {
  const userId = req.user._id;

  try {
    const findTasks = await task.find({ userId: userId });

    if (findTasks != "") {
      const taskDelete = await task.deleteMany({ userId: userId });
    }
    const infoDelete = await User.findByIdAndUpdate(userId, {
      isActive: false,
    });
    return res.json({
      status: "User deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: "An error occurred while trying to delete",
    });
  }
};

module.exports = userCtrl;
