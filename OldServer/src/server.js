const express = require("express");
const path = require("path");
const dbConnection = require("./database");
const morgan = require("morgan");

// Initializations
const app = express();
dbConnection();

// Settings

// Middlewares
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Global variables

// Static files


// Routes

// Importando rutas
app.use(require("./routes/auth.routes"));
app.use(require("./routes/task.routes"));
app.use(require("./routes/user.routes"));
// Exports
module.exports = app;
