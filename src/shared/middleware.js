/* eslint-disable no-param-reassign */
const express = require('express');

const {
    Error: { ValidationError: MongoValidationError },
} = require('mongoose');

const config = require('../config');
const { verifyToken } = require('./utils');

const checkAuth = (req, res, next) => {
    try {
        const token = req.headers.authorization.split('Bearer ')[1];
        req.user = verifyToken(token).user;
        return next();
    } catch (error) {
        res.status(401);
        error.message = 'Invalid Token';
        return next(error);
    }
};

/*
 * To do JSON Parsing and handle JSON Parsing Error
 */
const checkJson = (req, res, next) => {
    express.json()(req, res, (error) => {
        if (!error) {
            return next();
        }
        res.status(400);
        error.fullMessage = error.message;
        error.message = 'Invalid data format.';
        return next(error);
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
    if (error instanceof MongoValidationError) {
        // NOTE: MongoDB Validation Error
        error.fullMessage = error.message;
        error.message = 'Invalid Input';
        res.status(400);
    }
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
        req.body = value;
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
