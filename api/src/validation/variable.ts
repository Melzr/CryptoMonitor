import Joi from 'joi';

export const VariableSchema = Joi.object().keys({   
    name: Joi.string().required().min(1).max(200),
    value:  Joi.alternatives().try(Joi.string(), Joi.number(), Joi.boolean()).required(),
}).unknown(true);
