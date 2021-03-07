const Joi = require("joi");


class messageValidator
{
    createValidator(input)
    {
        const schema = Joi.object({
            message:Joi.string().regex(/([a-zA-Z0-9])([a-zA-Z0-9])([a-zA-Z0-9])([a-zA-Z0-9])([a-zA-Z0-9])(\s([a-zA-Z0-9])*)*/),
            author:Joi.string().regex(/([a-zA-Z])+\s([a-zA-Z])+(\s[a-zA-Z0-9]*)*/),
            ts:Joi.date().required()
        });
        return schema.validate(input);
    }
    updateValidator(input)
    {
        const schema = Joi.object({
            message:Joi.string().alphanum().min(1).max(30).required(),
            author:Joi.string().regex(/[a-zA-Z]+\s[a-zA-Z]+/),
        });
        return schema.validate(input);
    }
}

module.exports=messageValidator;