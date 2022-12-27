const Joi = require('joi');

const registerVSchema = Joi.object({
    username: Joi.string().trim().alphanum().min(5).max(20).required(),
    email: Joi.string().trim().email({ minDomainSegments: 2 }).required(),
    password: Joi.string()
        .trim()
        .required()
        .pattern(/^[\w!@#$%^&(){}[\]]{3,30}$/, 'password'),
});

const loginVSchema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(3).max(30),
});

module.exports = {
    registerVSchema,
    loginVSchema,
};
