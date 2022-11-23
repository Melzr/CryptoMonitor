import { Value, ValueType } from '../service/value';
import { VariableManager } from '../service/variableManager';
import assert from "assert";
import { Action } from '../service/action';
import { getBalance } from '../service/wallet';

describe('action', function () {
    it('should be able to set a variable', async function () {
        await Action.perform({
            type: 'SET_VARIABLE',
            name: 'ValorMinimoTDD',
            value: {
                type: 'CONSTANT',
                value: 12
            }
        });
        assert.deepEqual(VariableManager.Instance.getVariable('ValorMinimoTDD'), 12);
    });

    it('should be able to save a boolean variable', async function () {
        await Action.perform({
            type: 'SET_VARIABLE',
            name: 'Booleano',
            value: {
                type: 'CONSTANT',
                value: true
            }
        });
        assert.deepEqual(VariableManager.Instance.getVariable('Booleano'), true);
    });

    it('show be able to save a string variable', async function () {
        await Action.perform({
            type: 'SET_VARIABLE',
            name: 'HelloWorld',
            value: {
                type: 'CONSTANT',
                value: 'Hello world'
            }
        });     
        assert.deepEqual(VariableManager.Instance.getVariable('HelloWorld'), 'Hello world');
    });

    it('should be able to buy', async function () {
        const balance = await getBalance('BTC');
        await Action.perform({
            type: 'BUY_MARKET',
            symbol: 'BTC/USDT',
            amount: {
                type: 'CONSTANT',
                value: 0.01
            }
        });
        assert.deepEqual(await getBalance('BTC'), balance + 0.01);
    });

    it('should be able to sell', async function () {
        const balance = await getBalance('BTC');
        await Action.perform({
            type: 'SELL_MARKET',
            symbol: 'BTC/USDT',
            amount: {
                type: 'CONSTANT',
                value: 0.01
            }
        });
        
        assert.deepEqual(await getBalance('BTC'), balance - 0.01);
    });

    it('should be able to buy and sell', async function () {
        const balance = await getBalance('BNB');
        await Action.perform({
            type: 'BUY_MARKET',
            symbol: 'BNB/USDT',
            amount: {
                type: 'CONSTANT',
                value: 12
            }
        });
        await Action.perform({
            type: 'SELL_MARKET',
            symbol: 'BNB/USDT',
            amount: {
                type: 'CONSTANT',
                value: 12
            }
        });
        assert.deepEqual(await getBalance('BNB'), balance);
    });

    it('should not be able to buy negative amount', async function () {
        const balance = await getBalance('BNB');
        assert.rejects(
            () => Action.perform({
                type: 'BUY_MARKET',
                symbol: 'BNB/USDT',
                amount: {
                    type: 'CONSTANT',
                    value: -1
                }
            }),
            Error
        );
        assert.deepEqual(await getBalance('BNB'), balance);
    });

    it('should not be able to sell negative amount', async function () {
        const balance = await getBalance('DOGE');
        assert.rejects(
            async () => await Action.perform({
                type: 'SELL_MARKET',
                symbol: 'DOGE/USDT',
                amount: {
                    type: 'CONSTANT',
                    value: -1
                }
            }),
            Error
        );
        assert.deepEqual(await getBalance('DOGE'), balance);
    });
});

