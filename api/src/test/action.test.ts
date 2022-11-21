import { Value, ValueType } from '../service/value';
import { VariableManager } from '../service/variableManager';
import assert from "assert";
import { Action } from '../service/action';
import { getBalance } from '../service/wallet';

describe('action', function () {
    it('should be able to set a variable', function () {
        Action.perform({
            type: 'SET_VARIABLE',
            name: 'ValorMinimoTDD',
            value: {
                type: 'CONSTANT',
                value: 12
            }
        });
        assert.deepEqual(VariableManager.Instance.getVariable('ValorMinimoTDD'), 12);
    });

    it('should be able to save a boolean variable', function () {
        Action.perform({
            type: 'SET_VARIABLE',
            name: 'Booleano',
            value: {
                type: 'CONSTANT',
                value: true
            }
        });
        assert.deepEqual(VariableManager.Instance.getVariable('Booleano'), true);
    });

    it('show be able to save a string variable', function () {
        Action.perform({
            type: 'SET_VARIABLE',
            name: 'HelloWorld',
            value: {
                type: 'CONSTANT',
                value: 'Hello world'
            }
        });     
        assert.deepEqual(VariableManager.Instance.getVariable('HelloWorld'), 'Hello world');
    });

    it('should be able to buy', function () {
        Action.perform({
            type: 'BUY_MARKET',
            symbol: 'BTC/USDT',
            amount: {
                type: 'CONSTANT',
                value: 12
            }
        });
        assert.deepEqual(getBalance('BTC'), 12);
    });

    it('should be able to sell', function () {
        Action.perform({
            type: 'SELL_MARKET',
            symbol: 'BTC/USDT',
            amount: {
                type: 'CONSTANT',
                value: 12
            }
        });
        assert.deepEqual(getBalance('BTC'), 0);
    }
    );

    it('should be able to buy and sell', function () {
        Action.perform({
            type: 'BUY_MARKET',
            symbol: 'ADA/USDT',
            amount: {
                type: 'CONSTANT',
                value: 12
            }
        });
        Action.perform({
            type: 'SELL_MARKET',
            symbol: 'ADA/USDT',
            amount: {
                type: 'CONSTANT',
                value: 12
            }
        });
        assert.deepEqual(getBalance('ADA'), 0);
    });

    it('should not be able to buy negative amount', function () {
        assert.throws(
            () => Action.perform({
                type: 'BUY_MARKET',
                symbol: 'TDD/USDT',
                amount: {
                    type: 'CONSTANT',
                    value: -1
                }
            }),
            Error
        );
        assert.deepEqual(getBalance('TDD'), 0);
    });

    it('should not be able to sell negative amount', function () {
        assert.throws(
            () => Action.perform({
                type: 'SELL_MARKET',
                symbol: 'DOGE/USDT',
                amount: {
                    type: 'CONSTANT',
                    value: -1
                }
            }),
            Error
        );
        assert.deepEqual(getBalance('DOGE'), 0);
    });
});

