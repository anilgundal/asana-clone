const Joi = require('joi');

const insertValidation = Joi.object({
    title: Joi.string().required().min(3),
    description: Joi.string().min(3),
    assigned_to: Joi.string().min(8),
    due_date: Joi.string().min(3),
    statuses: Joi.array(),
    section_id: Joi.string().required().min(8),
    project_id: Joi.string().required().min(8),
    order: Joi.number(),
    isCompleted: Joi.boolean(),
    media: Joi.array(),
    sub_tasks: Joi.array(),
    comments: Joi.array(),
});

const changeValidation = Joi.object({
    title: Joi.string().min(3),
    description: Joi.string().min(3),
    assigned_to: Joi.string().min(8),
    due_date: Joi.string().min(3),
    statuses: Joi.array(),
    section_id: Joi.string().min(8),
    project_id: Joi.string().min(8),
    order: Joi.number(),
    isCompleted: Joi.boolean(),
    media: Joi.array(),
    sub_tasks: Joi.array(),
    comments: Joi.array(),
});

const commentValidation = Joi.object({
    comment: Joi.string().min(3),
    _id: Joi.string().min(8),
    _destroy: Joi.boolean(),
});


module.exports = {
    insertValidation,
    changeValidation,
    commentValidation,
}