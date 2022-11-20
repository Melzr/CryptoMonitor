import { describe, it } from "mocha";
import assert from "assert";
import { Value } from "../service/value";
import { VariableManager } from "../service/variableManager";

describe('value', function () {
    it('should be able to parse a constant number', function () {
        const parseResult = Value.parse({ type: 'CONSTANT', value: 1 })
        assert.strictEqual(parseResult, 1);
    });
    
    it('should be able to parse a constant string', function () {
        const parseResult = Value.parse({ type: 'CONSTANT', value: 'Hello world' })
        assert.strictEqual(parseResult, 'Hello world');
    });

    it('should be able to parse a constant boolean', function () {
        const parseResult = Value.parse({ type: 'CONSTANT', value: true })
        assert.strictEqual(parseResult, true);
    });

    it('should be able to parse a variable', function () {
        VariableManager.Instance.setVariable('LAST_TDD/USDT_SELL_PRICE', 1.53);
        const parseResult = Value.parse({ type: 'VARIABLE', name: 'LAST_TDD/USDT_SELL_PRICE' })
        assert.strictEqual(parseResult, 1.53);
    });
    
    it('should be able to parse a wallet', function () {
        const parseResult = Value.parse({ type: 'WALLET', symbol: 'BTC' })
        assert.strictEqual(parseResult, 0);
    });

    it('should be able to parse a == call', function () {
        const parseResult = Value.parse({ type: 'CALL', name: '==', arguments: [{ type: 'CONSTANT', value: 1 }, { type: 'CONSTANT', value: 1 }] })
        assert.strictEqual(parseResult, true);
    });

    it('should be able to parse a AND call', function () {
        const parseResult = Value.parse({ type: 'CALL', name: 'AND', arguments: [{ type: 'CONSTANT', value: true }, { type: 'CONSTANT', value: true }] })
        assert.strictEqual(parseResult, true);
    });

    it('should be able to parse a OR call', function () {
        const parseResult = Value.parse({ type: 'CALL', name: 'OR', arguments: [{ type: 'CONSTANT', value: true }, { type: 'CONSTANT', value: false }] })
        assert.strictEqual(parseResult, true);
    });

    it('should be able to parse a DISTINCT call', function () {   
        const parseResult = Value.parse({ type: 'CALL', name: 'DISTINCT', arguments: [{ type: 'CONSTANT', value: 1 }, { type: 'CONSTANT', value: 2 }] })
        assert.strictEqual(parseResult, true);
    });

    it('should be able to parse a > call', function () {
        const parseResult = Value.parse({ type: 'CALL', name: '>', arguments: [{ type: 'CONSTANT', value: 2 }, { type: 'CONSTANT', value: 1 }] })
        assert.strictEqual(parseResult, true);
    });

    it('should be able to parse a >= call', function () {
        const parseResult = Value.parse({ type: 'CALL', name: '>=', arguments: [{ type: 'CONSTANT', value: 1 }, { type: 'CONSTANT', value: 1 }] })
        assert.strictEqual(parseResult, true);
    });

    it('should be able to parse a < call', function () {
        const parseResult = Value.parse({ type: 'CALL', name: '<', arguments: [{ type: 'CONSTANT', value: 1 }, { type: 'CONSTANT', value: 2 }] })
        assert.strictEqual(parseResult, true);
    });

    it('should be able to parse a <= call', function () {
        const parseResult = Value.parse({ type: 'CALL', name: '<=', arguments: [{ type: 'CONSTANT', value: 1 }, { type: 'CONSTANT', value: 1 }] })
        assert.strictEqual(parseResult, true);
    });

    it('should be able to parse a + call', function () {
        const parseResult = Value.parse({ type: 'CALL', name: '+', arguments: [{ type: 'CONSTANT', value: 1 }, { type: 'CONSTANT', value: 2 }] })
        assert.strictEqual(parseResult, 3);
    });
    
    it('should be able to parse a * call', function () {
        const parseResult = Value.parse({ type: 'CALL', name: '*', arguments: [{ type: 'CONSTANT', value: 2 }, { type: 'CONSTANT', value: 3 }] })
        assert.strictEqual(parseResult, 6);
    });

    it('should be able to parse a MIN call', function () {
        const parseResult = Value.parse({ type: 'CALL', name: 'MIN', arguments: [{ type: 'CONSTANT', value: 2 }, { type: 'CONSTANT', value: 3 }] })
        assert.strictEqual(parseResult, 2);
    });

    it('should be able to parse a MAX call', function () {
        const parseResult = Value.parse({ type: 'CALL', name: 'MAX', arguments: [{ type: 'CONSTANT', value: 2 }, { type: 'CONSTANT', value: 3 }] })
        assert.strictEqual(parseResult, 3);
    });

    it('should be able to parse a FIRST call', function () {
        const parseResult = Value.parse({ type: 'CALL', name: 'FIRST', arguments: [{ type: 'CONSTANT', value: 2 }, { type: 'CONSTANT', value: 3 }] })
        assert.strictEqual(parseResult, 2);
    });

    it('should be able to parse a LAST call', function () {
        const parseResult = Value.parse({ type: 'CALL', name: 'LAST', arguments: [{ type: 'CONSTANT', value: 2 }, { type: 'CONSTANT', value: 3 }] })
        assert.strictEqual(parseResult, 3);
    });

    it('should be able to parse a AVERAGE call', function () {
        const parseResult = Value.parse({ type: 'CALL', name: 'AVERAGE', arguments: [{ type: 'CONSTANT', value: 2 }, { type: 'CONSTANT', value: 3 }] })
        assert.strictEqual(parseResult, 2.5);
    });

    it('should be able to parse a STDDEV call', function () {
        const parseResult = Value.parse({ type: 'CALL', name: 'STDDEV', arguments: [{ type: 'CONSTANT', value: 2 }, { type: 'CONSTANT', value: 3 }] })
        assert.strictEqual(parseResult, 0.5);
    });
    
    it('should be able to parse a nested call', function () {
        const parseResult = Value.parse({ type: 'CALL', name: 'AND', arguments: [{ type: 'CALL', name: '==', arguments: [{ type: 'CONSTANT', value: 1 }, { type: 'CONSTANT', value: 1 }] }, { type: 'CALL', name: '==', arguments: [{ type: 'CONSTANT', value: 2 }, { type: 'CONSTANT', value: 2 }] }] })
        assert.strictEqual(parseResult, true);
    });
    

    it('should be able to parse a nested call with a variable', function () {
        VariableManager.Instance.setVariable('LAST_TDD/USDT_SELL_PRICE', 1.53);
        const parseResult = Value.parse({ type: 'CALL', name: 'AND', arguments: [{ type: 'CALL', name: '==', arguments: [{ type: 'CONSTANT', value: 1 }, { type: 'CONSTANT', value: 1 }] }, { type: 'CALL', name: 'DISTINCT', arguments: [{ type: 'CONSTANT', value: 2 }, { type: 'VARIABLE', name: 'LAST_TDD/USDT_SELL_PRICE' }] }] })
        assert.strictEqual(parseResult, true);
    });
})
