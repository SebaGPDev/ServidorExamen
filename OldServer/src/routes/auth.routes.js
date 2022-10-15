const router = require("express").Router();

const { auth } = require("../controllers/auth.controller");

router.post("/login", auth);

module.exports = router;
