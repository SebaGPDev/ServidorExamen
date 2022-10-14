const UserModel = require("../models/user.model");
const tokenSing = require("../helpers/generatorJWT");
const bcrypt = require("bcrypt");

const authCtrl = {};

authCtrl.auth = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ Error: "Error to authenticate" });
    }

    if (!user.isActive) {
      return res.status(400).json({ Error: "Error to authenticate" });
    }

    const validarPassword = bcrypt.compareSync(password, user.password);

    if (!validarPassword) {
      return res.status(400).send({ Error: "Error to authenticate" });
    }

    const token = await tokenSing({ uid: user._id });
    return res.json({ token });
  } catch (error) {
    return res.send({ Error: "Error to login" });
  }
};

module.exports = authCtrl;
