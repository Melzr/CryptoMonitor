import { DataManager, DataRegister } from "./dataManager";
import { VariableManager } from "./variableManager";
import { Wallet } from "./wallet";

export type ValueType
    = { type: 'CONSTANT'; value:  number | boolean | string  }
    | { type: 'VARIABLE'; name: string }
    | { type: 'WALLET'; symbol: string }
    | { type: 'CALL'; name: string; arguments: ValueType[] }
    | { type: 'DATA'; symbol: string; from: number; until: number; default: ValueType[] }

export class Value {

    static parse(value: ValueType): number | boolean | string | number[] {
        switch (value.type) {
            case 'CONSTANT':
                return value.value;
            case 'VARIABLE':
                return VariableManager.Instance.getVariable(value.name);
            case 'WALLET':
                return Wallet.Instance.getBalance(value.symbol);
            case 'DATA':
                let data = DataManager.Instance.getData(value.symbol, value.from, value.until);
                if (data.length === 0) {
                    return value.default.map(value => Value.parseAsNumber(Value.parse(value)));
                }
                return data;
            case 'CALL':
                return this.parseCall(value.name, value.arguments);
            default:
                throw new Error('Invalid value type');
        }
    }

    static parseAsNumber(value: number | boolean | string | number[]): number {
        if (typeof value === 'number') {
            return value;
        }
        if (typeof value !== 'boolean' && typeof value !== 'string') {
            return value[0];
        }
        return 0;
    }

    static parseCall(name: String, args: ValueType[]): number | boolean | string {
        args = args.flat();
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
                for (let i = 0; i < args.length - 1; i++) {
                }
                return args.every((arg, index) => index === 0 || Value.parse(args[index - 1]) < Value.parse(arg));
            case '<=':
                return args.every((arg, index) => index === 0 || Value.parse(args[index - 1]) <= Value.parse(arg));
            case 'NEGATE':
                if (args.length !== 1) {
                    throw new Error('Invalid number of arguments');
                }
                return Value.parseAsNumber(Value.parse(args[0])) * -1;
            case '-':
                if (args.length !== 2) {
                    throw new Error('Invalid number of arguments');
                }
                return Value.parseAsNumber(Value.parse(args[0])) - Value.parseAsNumber(Value.parse(args[1]));
            case '/':
                if (args.length !== 2) {
                    throw new Error('Invalid number of arguments');
                }
                return Value.parseAsNumber(Value.parse(args[0])) / Value.parseAsNumber(Value.parse(args[1]));
            case '+':
                return args.reduce((acc, arg) => acc + Value.parseAsNumber(Value.parse(arg)), 0);
            case '*':
                return args.reduce((acc, arg) => acc * Value.parseAsNumber(Value.parse(arg)), 1);
            case 'AND':
                return args.every(arg => Value.parse(arg) === true);
            case 'NOT':
                if (args.length !== 1) {
                    throw new Error('Invalid number of arguments');
                }
                return !Value.parse(args[0]);
            case 'OR':
                return args.some(arg => Value.parse(arg));
            case 'MIN':
                return Math.min(...args.map(arg => Value.parseAsNumber(Value.parse(arg))));
            case 'MAX':
                return Math.max(...args.map(arg => Value.parseAsNumber(Value.parse(arg))));
            case 'FIRST':
                return Value.parseAsNumber(Value.parse(args[0]));
            case 'LAST':
                  return Value.parseAsNumber(Value.parse(args[args.length - 1]));
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