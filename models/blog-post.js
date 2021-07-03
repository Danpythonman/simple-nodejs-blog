const Joi = require("joi");

const schema = Joi.object({
    title: Joi.string().required(),
    body: Joi.string().required()
});

module.exports = schema;
