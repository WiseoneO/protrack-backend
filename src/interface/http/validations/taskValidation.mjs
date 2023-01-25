// import joi from 'joi';
import joi from "joi";

export function createTaskSchema(team){
    const schema = joi.object({
        title: joi.string().required().min(4),
        description: joi.string().required().min(4),
        department: joi.string().required().min(1),
        status: joi.string().required(),
        time_frame: joi.string(),
        start_date: joi.string().required()
        
    }).unknown();
    return schema.validate(team);
}

export function edit(team){
    const schema = joi.object({
        status: joi.string().required(),
    }).unknown();
    return schema.validate(team);
}