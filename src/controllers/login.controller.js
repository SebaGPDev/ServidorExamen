const UserModel = require("../models/Users");
const tokenSing = require("../helpers/generatorJWT");
const bcrypt = require("bcrypt");

const authCtrol = {};

authCtrol.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await UserModel.findOne({ username });
    if (!user) {
      return res.status(404).json({
        Message:
          "An error occurred while trying to login to the account (User not found)",
      });
    }

    if (!user.isActive) {
      return res.status(403).json({
        Message:
          "An error occurred while trying to login to the account (User not active)",
      });
    }

    const matchPassword = bcrypt.compareSync(password, user.password);

    if (!matchPassword) {
      return res.status(404).json({
        Message:
          "An error occurred while trying to login to the account ( the password does not match )",
      });
    }

    const tokenSession = await tokenSing({ uid: user._id });
    return res.json({ tokenSession });
  } catch (error) {
    console.log(error);
    return res.json({
      Message: "An error occurred while trying to login to the account",
    });
  }
};

module.exports = authCtrol;
