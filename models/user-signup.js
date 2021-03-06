const Joi = require("joi");

const schema = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
    full_name: Joi.string().required()
});

module.exports = schema;
