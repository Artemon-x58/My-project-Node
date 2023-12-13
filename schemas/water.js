const Joi = require("joi");

const dateRegexp = /^\d{4}\.\d{2}\.\d{2}$/;

const waterSchema = Joi.object({
  id: Joi.string(),
  water: Joi.number().min(1).max(3000).required(),
  date: Joi.string().pattern(dateRegexp).required(),
});

module.exports = waterSchema;
