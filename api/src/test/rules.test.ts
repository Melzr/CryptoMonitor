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
});

