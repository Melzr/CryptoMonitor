import { Value, ValueType } from "./value";
import { VariableManager } from "./variableManager";
import { Wallet } from "./wallet";

export type ActionType
    = { type: 'BUY_MARKET' | 'SELL_MARKET'; symbol:  string; amount: ValueType }
    | { type: 'SET_VARIABLE'; name:  string; value: ValueType}


export class Action {

    static async perform(action: ActionType) {
        switch (action.type) {
            case 'SET_VARIABLE':
                let value = await Value.parse(action.value);
                if (Array.isArray(value)) {
                    value = value[0];
                }
                VariableManager.Instance.setVariable(action.name, value);
                break;
            case 'SELL_MARKET':
                Wallet.Instance.sellAmount(action.symbol.split('/')[0], Value.parseAsNumber(await Value.parse(action.amount)));
                break;
            case 'BUY_MARKET':
                Wallet.Instance.buyAmount(action.symbol.split('/')[0], Value.parseAsNumber(await Value.parse(action.amount)));
                break;
            default:
                throw new Error('Invalid value type');
        }
    }

}