import { Value, ValueType } from "./value";
import { VariableManager } from "./variableManager";
import { Wallet } from "./wallet";

export type ActionType
    = { type: 'BUY_MARKET' | 'SELL_MARKET'; symbol:  string; amount: ValueType }
    | { type: 'SET_VARIABLE'; name:  string; value: ValueType; symbol: string }


export class Action {

    static perform(action: ActionType) {
        switch (action.type) {
            case 'SET_VARIABLE':
                VariableManager.Instance.setVariable(action.name, Value.parse(action.value));
                break;
            case 'SELL_MARKET':
                var value = Value.parseAsNumber(Value.parse(action.amount));
                Wallet.Instance.sellAmount(action.symbol, value);
                break;
            case 'BUY_MARKET':
                var value = Value.parseAsNumber(Value.parse(action.amount));
                Wallet.Instance.buyAmount(action.symbol, value);
                break;
            default:
                throw new Error('Invalid value type');
        }
    }

}