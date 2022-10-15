const mongoose = require("mongoose");
const { MONGODB_HOST, MONGODB_DATABASE } = process.env;
const MONGODB_URI = `mongodb://${MONGODB_HOST}/${MONGODB_DATABASE}`;

const dbConnection = () => {
  try {
    mongoose.connect(MONGODB_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log("database connection established");
  } catch (err) {
    console.log("connection error: " + err.message);
  }
};

module.exports = dbConnection;