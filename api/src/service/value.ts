import { DataManager } from "./dataManager";
import { VariableManager } from "./variableManager";
import { Wallet } from "./wallet";

export const ValidCallNames =
    ['==', 'DISTINCT', ">", "<", ">=", "<=", "NEGATE", "-", "/", "+", "*",
    "MIN", "MAX", "AVERAGE", "STDDEV", "FIRST", "LAST", "NOT", "AND", "OR"]

export type ValueType
    = { type: 'CONSTANT'; value:  number | boolean | string  }
    | { type: 'VARIABLE'; name: string }
    | { type: 'WALLET'; symbol: string }
    | { type: 'CALL'; name: string; arguments: ValueType[] }
    | { type: 'DATA'; symbol: string; from: number; until: number; default: ValueType[] }

export class Value {

    static async parse(value: ValueType): Promise<number | boolean | string | number[]> {
        switch (value.type) {
            case 'CONSTANT':
                return value.value;
            case 'VARIABLE':
                return VariableManager.Instance.getVariable(value.name);
            case 'WALLET':
                return await Wallet.Instance.getBalance(value.symbol);
            case 'DATA':
                let data = DataManager.Instance.getData(value.symbol, value.from, value.until);
                if (data.length === 0) {
                    return await Promise.all(value.default.map(async (value) => Value.parseAsNumber(await Value.parse(value))));
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

    static async parseCall(name: String, args: ValueType[]): Promise<number | boolean | string> {
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
                return Value.parseAsNumber(await Value.parse(args[0])) * -1;
            case '-':
                if (args.length !== 2) {
                    throw new Error('Invalid number of arguments');
                }
                return Value.parseAsNumber(await Value.parse(args[0])) - Value.parseAsNumber(await Value.parse(args[1]));
            case '/':
                if (args.length !== 2) {
                    throw new Error('Invalid number of arguments');
                }
                return Value.parseAsNumber(await Value.parse(args[0])) / Value.parseAsNumber(await Value.parse(args[1]));
            case '+':
                const maped_plus = await Promise.all(args.map(async (arg) => Value.parseAsNumber(await Value.parse(arg))));
                return maped_plus.reduce((a, b) => a + b, 0);
            case '*':
                const maped_mul = await Promise.all(args.map(async (arg) => Value.parseAsNumber(await Value.parse(arg))));
                return maped_mul.reduce((a, b) => a * b, 1);
            case 'AND':
                const maped_and = await Promise.all(args.map(async (arg) => Value.parse(arg)));
                return maped_and.every((arg) => arg);
            case 'NOT':
                if (args.length !== 1) {
                    throw new Error('Invalid number of arguments');
                }
                return !Value.parse(args[0]);
            case 'OR':
                return args.some(arg => Value.parse(arg));
            case 'MIN':
                const maped_min = await Promise.all(args.map(async (arg) => Value.parseAsNumber(await Value.parse(arg))));
                return Math.min(...maped_min);
            case 'MAX':
                const maped_max = await Promise.all(args.map(async (arg) => Value.parseAsNumber(await Value.parse(arg))));
                return Math.max(...maped_max);
            case 'FIRST':
                return Value.parseAsNumber(await Value.parse(args[0]));
            case 'LAST':
                  return Value.parseAsNumber(await Value.parse(args[args.length - 1]));
            case 'AVERAGE':
                const maped_avg = await Promise.all(args.map(async (arg) => Value.parseAsNumber(await Value.parse(arg))));
                return maped_avg.reduce((a, b) => a + b, 0) / maped_avg.length;
            case 'STDDEV':
                const maped_std = await Promise.all(args.map(async (arg) => Value.parseAsNumber(await Value.parse(arg))));
                const avg = maped_std.reduce((a, b) => a + b, 0) / maped_std.length;
                const squareDiffs = maped_std.map((value) => {
                    const diff = value - avg;
                    const sqrDiff = diff * diff;
                    return sqrDiff;
                });
                const avgSquareDiff = squareDiffs.reduce((a, b) => a + b, 0) / squareDiffs.length;
                return Math.sqrt(avgSquareDiff);
            default:
                throw new Error('Invalid call name');
        }
    }
}