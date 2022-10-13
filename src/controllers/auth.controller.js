const { encrypt, compare } = require("../helpers/handleBcrypt");
const UserModel = require("../models/User");
const { tokenSing } = require("../helpers/generatorJWT");

const authCtrl = {};

authCtrl.register = async (req, res) => {
  try {
    const { username, password, email } = req.body;

    const passwordHash = await encrypt(password);
    const registerUser = await UserModel.create({
      username,
      email,
      password: passwordHash,
    });
    res.send({ data: registerUser });
  } catch (err) {
    console.error(err);
  }
};

authCtrl.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });

    if (!user) {
      res.status(404);
      res.send({ error: "User not found" });
    }
    const matchPassword = await compare(password, user.password);
    const tokenSession = await tokenSing(user);
    if (matchPassword) {
      res.send({ data: user, tokenSession });
    }
    if (!matchPassword) {
      res.status(404);
      res.send({ error: "Password mismatch" });
    }
  } catch (err) {
    console.error(err);
  }
};

module.exports = authCtrl;