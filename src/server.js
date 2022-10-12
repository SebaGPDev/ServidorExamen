const express = require("express");
const path = require("path");
const dbConnection = require("./database");
const User = require("./models/User");
const morgan = require("morgan");

// Initializations
const app = express();
dbConnection();

// Settings
app.set("port", process.env.PORT || 3000);

// Middlewares
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Global variables

// Routes
app.get("/", (req, res) => {
  res.send("Welcome");
});

// Static files
// const newUser = new User({
//   username: "Sebastian",
//   password: "123",
//   email: "admin@example.com",
//   role: 'Admin',
// });

// newUser.encryptPassword();
// newUser.matchPassword();

// newUser.save();

// console.log(newUser);

// Routes
app.use(require("./routes/task.routes")); // Importando rutas
app.use(require("./routes/auth.routes"));
// Exports
module.exports = app;
