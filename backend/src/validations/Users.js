const Joi = require('joi');



const loginValidation = Joi.object({
    password: Joi.string().required().min(8),
    email: Joi.string().email().required().min(8),
});

const insertValidation = Joi.object({
    name: Joi.string().required().min(3),
    surname: Joi.string().required().min(3),
    password: Joi.string().required().min(8),
    confirmation: Joi.string().required().min(8),
    toc: Joi.number().required(),
    email: Joi.string().email().required().min(8),
});


const resetPasswordValidation = Joi.object({
    email: Joi.string().email().required().min(8),
});

const changePasswordValidation = Joi.object({
    password: Joi.string().required().min(8),
});

const changeValidation = Joi.object({
    fullname: Joi.string().min(3),
    email: Joi.string().email().min(8),
});

module.exports = {
    insertValidation,
    loginValidation,
    resetPasswordValidation,
    changeValidation,
    changePasswordValidation
}