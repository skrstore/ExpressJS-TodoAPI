const express = require("express");
const { verify } = require("jsonwebtoken");

const jwtSecret = process.env.JWT_SECRET || "secret";

const checkAuth = (req, res, next) => {
    try {
        const token = req.headers.authorization.split("Bearer ")[1];
        req.user = verify(token, jwtSecret);
        next();
    } catch (error) {
        res.status(401).json({ error: "Invalid Token" });
    }
};

// To do JSON Parsing and handle JSON Parsing Error
const checkJson = (req, res, next) => {
    express.json()(req, res, (err) => {
        if (err) {
            return res
                .status(err.status)
                .send({ error: "Invalid data format." });
        }
        next();
    });
};

const handleInvalidPath = (req, res) => {
    res.status(404).send({
        message: "Invalid Path. This path does not Exists",
    });
};

module.exports = { checkAuth, checkJson, handleInvalidPath };
