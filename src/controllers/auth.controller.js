const { encrypt, compare } = require("../helpers/handleBcrypt");
const User = require("../models/User");

const authCtrl = {};

authCtrl.register = async (req, res) => {
  try {
    const { username, password, email } = req.body;

    const passwordHash = await encrypt(password);
    const registerUser = await User.create({
      username,
      email,
      password: passwordHash,
    });
    res.send({ data: registerUser });
  } catch (err) {}
};

module.exports = authCtrl;