import { describe, it } from "mocha";
import assert from "assert";

type ValueType
    = { type: 'CONSTANT'; value:  number | boolean | string  }
    | { type: 'VARIABLE'; name: String }
    | { type: 'WALLET'; symbol: String }
    | { type: 'CALL'; name: String; arguments: ValueType[] }

class Value {

    static parse(value: ValueType): number | boolean | string {
        switch (value.type) {
            case 'CONSTANT':
                return value.value;
            case 'VARIABLE':
                // tomar el valor de la variable
                return 0;
            case 'WALLET':
                // tomar el valor del wallet
                return 0;
            case 'CALL':
                return this.parseCall(value.name, value.arguments);
            default:
                throw new Error('Invalid value type');
        }
    }

    static parseAsNumber(value: number | boolean | string): number {
        if (typeof value === 'number') {
            return value;
        }
        return 0;
    }

    static parseCall(name: String, args: ValueType[]): number | boolean | string {
        switch (name) {
            case '==':
                return args.every(arg => Value.parse(arg) === Value.parse(args[0]));
            case 'DISTINCT':
                let distinct = new Set(args.map(arg => Value.parse(arg)));
                return distinct.size === args.length;
            case '>':
                return args.every((arg, index) => index === 0 || Value.parse(args[index - 1]) > Value.parse(arg));
            case '>=':
                return args.every((arg, index) => index === 0 || Value.parse(args[index - 1]) >= Value.parse(arg));
            case '<':
                return args.every((arg, index) => index === 0 || Value.parse(args[index - 1]) < Value.parse(arg));
            case '<=':
                return args.every((arg, index) => index === 0 || Value.parse(args[index - 1]) <= Value.parse(arg));
            case '+':
                return args.reduce((acc, arg) => acc + Value.parseAsNumber(Value.parse(arg)), 0);
            case '*':
                return args.reduce((acc, arg) => acc * Value.parseAsNumber(Value.parse(arg)), 1);
            case 'AND':
                return args.every(arg => Value.parse(arg) === true);
            case 'OR':
                return args.some(arg => Value.parse(arg));
            case 'MIN':
                return Math.min(...args.map(arg => Value.parseAsNumber(Value.parse(arg))));
            case 'MAX':
                return Math.max(...args.map(arg => Value.parseAsNumber(Value.parse(arg))));
            case 'FIRST':
                return Value.parse(args[0]);
            case 'LAST':
                return Value.parse(args[args.length - 1]);
            case 'AVERAGE':
                return args.reduce((acc, arg) => acc + Value.parseAsNumber(Value.parse(arg)), 0) / args.length;
            case 'STDDEV':
                let avg = args.reduce((acc, arg) => acc + Value.parseAsNumber(Value.parse(arg)), 0) / args.length;
                return Math.sqrt(args.reduce((acc, arg) => acc + Math.pow(Value.parseAsNumber(Value.parse(arg)) - avg, 2), 0) / args.length);
            default:
                throw new Error('Invalid call name');
        }
    }
}

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
        const parseResult = Value.parse({ type: 'VARIABLE', name: 'LAST_TDD/USDT_SELL_PRICE' })
        assert.strictEqual(parseResult, 0);
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
        const parseResult = Value.parse({ type: 'CALL', name: 'AND', arguments: [{ type: 'CALL', name: '==', arguments: [{ type: 'CONSTANT', value: 1 }, { type: 'CONSTANT', value: 1 }] }, { type: 'CALL', name: 'DISTINCT', arguments: [{ type: 'CONSTANT', value: 2 }, { type: 'VARIABLE', name: 'LAST_TDD/USDT_SELL_PRICE' }] }] })
        assert.strictEqual(parseResult, true);
    });
})
