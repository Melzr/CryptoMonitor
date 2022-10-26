import { VariableManager } from "./variableManager";
import { Wallet } from "./wallet";

export type ValueType
    = { type: 'CONSTANT'; value:  number | boolean | string  }
    | { type: 'VARIABLE'; name: string }
    | { type: 'WALLET'; symbol: string }
    | { type: 'CALL'; name: string; arguments: ValueType[] }
    | { type: 'DATA'; symbol: string; from: number; until: number; default: ValueType[] }

export class Value {

    static parse(value: ValueType): number | boolean | string {
        switch (value.type) {
            case 'CONSTANT':
                return value.value;
            case 'VARIABLE':
                return VariableManager.Instance.getVariable(value.name);
            case 'WALLET':
                return Wallet.Instance.getBalance(value.symbol);
            case 'DATA':
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