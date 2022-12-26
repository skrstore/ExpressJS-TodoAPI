const express = require('express');
const { verify } = require('jsonwebtoken');

const config = require('../config');

const checkAuth = (req, res, next) => {
    try {
        const token = req.headers.authorization.split('Bearer ')[1];
        req.user = verify(token, config.JWT_SECRET).user;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid Token' });
    }
};

/*
 * To do JSON Parsing and handle JSON Parsing Error
 */
const checkJson = (req, res, next) => {
    express.json()(req, res, (err) => {
        if (err) {
            return res.status(err.status).send({ error: 'Invalid data format.' });
        }
        return next();
    });
};

const handleInvalidPath = (req, res) => {
    res.status(404).send({
        message: 'Invalid Path. This path does not Exists',
    });
};

// eslint-disable-next-line no-unused-vars
const handleError = (error, req, res, _next) => {
    // TODO: Explore more on - https://expressjs.com/en/guide/error-handling.html
    const statusCode = res.statusCode >= 400 ? res.statusCode : 500;
    console.log('[handleError] ', error.message);
    return res.status(statusCode).send({
        message: error.message,
        status: 'fail',
    });
};

const handleRoot = (req, res) => {
    res.send({
        message: `Server :: ${config.name}`,
        version: config.version,
    });
};

const logRequest = (req, res, next) => {
    console.log(`[req] ${req.hostname} : ${req.method} : ${req.path}`);
    next();
};

const validateReqBody = (schema) => (req, res, next) => {
    // eslint-disable-next-line no-unused-vars
    const { value, error } = schema.validate(req.body);
    if (!error) {
        return next();
    }
    res.status(400);
    throw error;
};

module.exports = {
    checkAuth,
    checkJson,
    handleInvalidPath,
    handleError,
    handleRoot,
    logRequest,
    validateReqBody,
};
