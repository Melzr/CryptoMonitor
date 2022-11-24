import { Value, ValueType } from "./value";
import { VariableManager } from "./variableManager";
import { buyAmount, sellAmount } from "./wallet";

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
                try {
                    await sellAmount(action.symbol.replace('/', ''), Value.parseAsNumber(await Value.parse(action.amount)));
                } catch (e) {
                    console.log(e);
                }
                break;
            case 'BUY_MARKET':
                try {
                    await buyAmount(action.symbol.replace('/', ''), Value.parseAsNumber(await Value.parse(action.amount)));
                } catch (e) {
                    console.log(e);
                }
                break;
            default:
                throw new Error('Invalid value type');
        }
    }

}