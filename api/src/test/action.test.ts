import { Value, ValueType } from '../value';
import { VariableManager } from '../variableManager';
import { Wallet } from '../wallet';
import assert from "assert";
import { Action } from '../action';

describe('action', function () {
    it('should be able to set a variable', function () {
        Action.perform({
            type: 'SET_VARIABLE',
            name: 'ValorMinimoTDD',
            value: {
                type: 'CONSTANT',
                value: 12
            },
            symbol: ''
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
            },
            symbol: ''
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
            },
            symbol: ''
        });     
        assert.deepEqual(VariableManager.Instance.getVariable('HelloWorld'), 'Hello world');
    });

    it('should be able to buy', function () {
        Action.perform({
            type: 'BUY_MARKET',
            symbol: 'TDD/BTC',
            amount: {
                type: 'CONSTANT',
                value: 12
            }
        });
        assert.deepEqual(Wallet.Instance.getBalance('TDD/BTC'), 12);
    });

    it('should be able to sell', function () {
        Action.perform({
            type: 'SELL_MARKET',
            symbol: 'TDD/BTC',
            amount: {
                type: 'CONSTANT',
                value: 12
            }
        });
        assert.deepEqual(Wallet.Instance.getBalance('TDD/BTC'), 0);
    }
    );

    it('should be able to buy and sell', function () {
        Action.perform({
            type: 'BUY_MARKET',
            symbol: 'TDD/ADA',
            amount: {
                type: 'CONSTANT',
                value: 12
            }
        });
        Action.perform({
            type: 'SELL_MARKET',
            symbol: 'TDD/ADA',
            amount: {
                type: 'CONSTANT',
                value: 12
            }
        });
        assert.deepEqual(Wallet.Instance.getBalance('TDD/ADA'), 0);
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
        assert.deepEqual(Wallet.Instance.getBalance('TDD'), 0);
    });

    it('should not be able to sell negative amount', function () {
        assert.throws(
            () => Action.perform({
                type: 'SELL_MARKET',
                symbol: 'TDD/DOGE',
                amount: {
                    type: 'CONSTANT',
                    value: -1
                }
            }),
            Error
        );
        assert.deepEqual(Wallet.Instance.getBalance('TDD/DOGE'), 0);
    });
    


});

