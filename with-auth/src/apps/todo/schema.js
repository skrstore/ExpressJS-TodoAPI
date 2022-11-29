const Joi = require('@hapi/joi');

module.exports = Joi.object({
    title: Joi.string().trim().min(3).max(20).required(),
    detail: Joi.string().trim().allow(''),
});
