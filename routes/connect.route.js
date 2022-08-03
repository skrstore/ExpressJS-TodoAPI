const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
    res.send({ message: "Connect App" });
});

router.get("/login", (req, res) => {
    res.send({ message: "Login" });
});

router.get("/register", (req, res) => {
    res.send({ message: "Register" });
});

module.exports = router;
