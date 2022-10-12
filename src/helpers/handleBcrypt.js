const bcrypt = require("bcrypt");

const encrypt = async (password) => {
  const hash = await bcrypt.hash(password, 10);
  return hash
};

const compare = async (password, password2) => {
    return await bcrypt.compare(password, password2);
}

module.exports = { encrypt, compare };