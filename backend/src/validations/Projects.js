const Joi = require('joi');

const insertValidation = Joi.object({
    name: Joi.string().required().min(5),
});

const changeValidation = Joi.object({
    name: Joi.string().required().min(5),
})

module.exports = {
    insertValidation,
    changeValidation
}