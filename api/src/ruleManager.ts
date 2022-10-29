import { Action, ActionType } from "./action";
import { Value, ValueType } from "./value";

interface Rule {
    name: string;
    condition: ValueType;
    action: ActionType[];
}

export class RuleManager {
    private static _instance: RuleManager;
    private _rules: { [key: string]: Rule } = {};

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

    public executeRules(symbol: string) {
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

}