import { describe, it } from "mocha";
import assert from "assert";
import { Wallet } from "../wallet";
import { RuleManager } from "../ruleManager";

describe('RuleManager', function () {
    it('should be able to set a rule', function () {
        RuleManager.Instance.setRule('Comprar 12 TDD/USDT siempre', {
            name: 'Comprar 12 TDD/USDT siempre',
            condition: {
                type: 'CONSTANT',
                value: true
            },
            action: [{
                type: 'BUY_MARKET',
                symbol: 'TDD/USDT',
                amount: {
                    type: 'CONSTANT',
                    value: 12
                }
            }]
        });
        assert.deepEqual(RuleManager.Instance.getRule('Comprar 12 TDD/USDT siempre'), {
            name: 'Comprar 12 TDD/USDT siempre',
            condition: {
                type: 'CONSTANT',
                value: true
            },
            action: [{
                type: 'BUY_MARKET',
                symbol: 'TDD/USDT',
                amount: {
                    type: 'CONSTANT',
                    value: 12
                }
            }]
        });
    });

    it('should be able to execute a rule', function () {
        RuleManager.Instance.setRule('Comprar 12 TDD/USDT siempre', {
            name: 'Comprar 12 TDD/USDT siempre',
            condition: {
                type: 'CONSTANT',
                value: true
            },
            action: [{
                type: 'BUY_MARKET',
                symbol: 'TDD/USDT',
                amount: {
                    type: 'CONSTANT',
                    value: 12
                }
            }]
        });
        RuleManager.Instance.executeRules('TDD/USDT');
        assert.deepEqual(Wallet.Instance.getBalance('TDD/USDT'), 12);
    });

    it('shoul be able to execute a rule with a variable', function () {
        RuleManager.Instance.setRule('Vender si sube 15%', {
            name: 'Vender si sube 15%',
            condition: {
                type: 'CALL',
                name: '>',
                arguments: [
                    {
                        type: 'CALL',
                        name: '*',
                        arguments: [
                            {
                                type: 'CONSTANT',
                                value: 1.15
                            },
                            {
                                type: 'VARIABLE',
                                name: 'LAST_SELL_VALUE_BTC/USDT'
                            }
                        ]
                    },
                    {
                        type: 'CALL',
                        name: 'LAST',
                        arguments: [{
                            type: 'DATA',
                            symbol: 'BTC/USDT',
                            from: 3600,
                            until: 0,
                            default: [{
                                type: 'CONSTANT',
                                value: 0
                            }]
                        }]
                    }
                ]
            },
            action: [{
                type: 'SELL_MARKET',
                symbol: 'BTC/USDT',
                amount: {
                    type: 'CONSTANT',
                    value: 0.1
                }
            },
            {
                type: 'SET_VARIABLE',
                name: 'LAST_SELL_VALUE_BTC/USDT',
                value: {
                    type: 'CALL',
                    name: 'LAST',
                    arguments: [{
                        type: 'DATA',
                        symbol: 'BTC/USDT',
                        from: 3600,
                        until: 0,
                        default: [{
                            type: 'CONSTANT',
                            value: 0
                        }]
                    }]
                }
            }]
        });
    });
});
