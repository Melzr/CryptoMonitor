import Joi from 'joi';

export const ChangeAmountSchema =  Joi.object<{ symbol: string; amount: number }>().keys({
    symbol: Joi.string().required(),
    amount: Joi.number().required(),
});
