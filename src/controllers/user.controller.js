const UserModel = require("../models/user.model");
const { encrypt } = require("../helpers/handleBcrypt");
const userCtrl = {};

userCtrl.checkUsers = async (req, res) => {
  const resp = await UserModel.findOne({ isActive: true });
  return res.json({
    status: "usuarios activo",
    resp,
  });
};

userCtrl.createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const passwordHash = await encrypt(password);
    const registerUser = await UserModel.create({
      username,
      email,
      password: passwordHash,
    });
    return res.json({
      status: "User created successfully",
    });
  } catch (err) {
    console.error(err);
  }
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
