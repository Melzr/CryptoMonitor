import { DataManager } from "./dataManager";
import { Action, ActionType } from "./action";
import { Value, ValueType } from "./value";

interface Rule {
    condition: ValueType;
    action: ActionType[];
}

export class RuleManager {
    private static _instance: RuleManager;
    private _rules: { [key: string]: Rule } = {};
    private _operable_values: { [key: string]: number } = {};

    private constructor() {}

    public static get Instance() {
        return this._instance || (this._instance = new this());
    }

    public setRule(name: string, value: Rule ) {
        this._rules[name] = value;
    }

    public getRule(name: string): Rule {
        return this._rules[name];
    }

    public getRules() {
        return this._rules;
    }

    public deleteRule(name: string) {
        delete this._rules[name];
    }

    public executeRules(symbol: string) {
        let actualValue = DataManager.Instance.getLastValue(symbol);
        if (this._operable_values[symbol] && actualValue && actualValue < this._operable_values[symbol]){
            return;
        }
        for (const nameRule in this._rules) {
            const ruleObj = this._rules[nameRule];
            const condition = ruleObj.condition;
            const actions = ruleObj.action;
            if (Value.parse(condition) === true) {
                for(const action in actions) {
                    let a = actions[action];
                    if(a.type === 'SET_VARIABLE'){
                        Action.perform(actions[action]);
                    } else if (symbol === a.symbol) {
                        Action.perform(actions[action]);
                    }
                }
            }
        }
    }

    public setOperableValue(name: string, value: number) {
        this._operable_values[name] = value;
    }
}