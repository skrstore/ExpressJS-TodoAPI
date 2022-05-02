const express = require("express");

const checkAuth = require("../middleware/middleware");
const router = express.Router();

const user = require("./controllers");

router.get("/", checkAuth, user.getUser);
router.post("/register", user.register);
router.post("/login", user.login);

module.exports = router;
