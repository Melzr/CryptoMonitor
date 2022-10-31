import Joi from 'joi';
import { ActionType } from '../action';
import { Rule } from '../ruleManager';
import { ValueType } from '../value';

interface RuleName extends Rule {
    name: string;
}

const ValueTypeSchema = Joi.object<ValueType>().keys({
    type: Joi.string().required().valid('CONSTANT', 'VARIABLE', 'WALLET', 'CALL', 'DATA'),
    value: Joi.when('type', { is: 'CONSTANT', then: Joi.required() }),
    symbol: Joi.string().when('type', { is: ['WALLET', 'DATA'], then: Joi.required() }),
    name: Joi.string().when('type', { is: ['CALL', 'VARIABLE'], then: Joi.required() }),
    arguments: Joi.array().items(Joi.link('...')).when('type', { is: 'CALL', then: Joi.required() }),
    from: Joi.number().integer().when('type', { is: 'DATA', then: Joi.required() }),
    until: Joi.number().integer().when('type', { is: 'DATA', then: Joi.required() }),
    default: Joi.array().items(Joi.link('...')).when('type', { is: 'DATA', then: Joi.required() })
});

export const schemas = {
    rule: Joi.object<RuleName>().keys({   
        name: Joi.string().required().min(1).max(200),
        condition: ValueTypeSchema.required(),
        action: Joi.array().items(Joi.object<ActionType>().keys({
            type: Joi.string().required().valid('BUY_MARKET', 'SELL_MARKET', 'SET_VARIABLE'),
            symbol: Joi.string().when('type', { is: ['BUY_MARKET', 'SELL_MARKET'], then: Joi.required() }),
            amount: ValueTypeSchema.when('type', { is: ['BUY_MARKET', 'SELL_MARKET'], then: Joi.required() }),
            name: Joi.string().when('type', { is: 'SET_VARIABLE', then: Joi.required() }),
            value: ValueTypeSchema.when('type', { is: 'SET_VARIABLE', then: Joi.required() })
        })).required()
    }),
    changeAmount: Joi.object<{ symbol: string; amount: number }>().keys({
        symbol: Joi.string().required(),
        amount: Joi.number().required(),
    }),
}
