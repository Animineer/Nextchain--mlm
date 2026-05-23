const Joi = require("joi");

/*
Register validation schema
*/

const registerSchema = Joi.object({
  name: Joi.string().required(),

  email: Joi.string()
    .email()
    .required(),

  password: Joi.string()
    .min(6)
    .required(),

  referralCode: Joi.string()
    .allow("")
    .optional(),
});

module.exports = {
  registerSchema,
};