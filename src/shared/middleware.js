/* eslint-disable no-param-reassign */
const express = require('express');
const { JsonWebTokenError } = require('jsonwebtoken');
const {
    Error: { ValidationError: MValidationError, CastError: MCastError },
} = require('mongoose');

const config = require('../config');
const { verifyToken } = require('./utils');

const checkAuth = (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            res.status(400);
            throw new Error("'authorization' token missing in header");
        }
        const token = req.headers.authorization.split('Bearer ')[1];
        req.user = verifyToken(token).user;
        return next();
    } catch (error) {
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
    if (error instanceof MValidationError) {
        res.status(400);
        error.fullMessage = error.message;
        error.message = 'Invalid Input';
    } else if (error instanceof JsonWebTokenError) {
        res.status(401);
        error.fullMessage = error.message;
        error.message = 'Invalid Token';
    } else if (error instanceof MCastError) {
        res.status(400);
        error.fullMessage = error.message;
        error.message = 'Invalid ID';
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
