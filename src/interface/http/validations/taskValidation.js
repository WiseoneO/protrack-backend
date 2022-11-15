const Joi = require("joi");

exports.createTaskSchema = (team) =>{
    const schema = Joi.object({
        title: Joi.string().required().min(4),
        description: Joi.string().required().min(4),
        department: Joi.string().required().min(1),
        status: Joi.string().required(),
        time_frame: Joi.string(),
        start_date: Joi.string().required()
        
    }).unknown();
    return schema.validate(team);
}

exports.edit = (team) =>{
    const schema = Joi.object({
        status: Joi.string().required(),
    }).unknown();
    return schema.validate(team);
}