export interface Rule {
    name: string;
    condition: ValueType;
    action: ActionType[];
  }
  
  export type ValueType
    = { type: 'CONSTANT'; value:  number | boolean | string  }
    | { type: 'VARIABLE'; name: string }
    | { type: 'WALLET'; symbol: string }
    | { type: 'CALL'; name: string; arguments: ValueType[] }
    | { type: 'DATA'; symbol: string; from: number; until: number; default: ValueType[] }
  
  
  export type ActionType
    = { type: 'BUY_MARKET' | 'SELL_MARKET'; symbol:  string; amount: ValueType }
    | { type: 'SET_VARIABLE'; name:  string; value: ValueType}
  
export interface Coin {
    symbol: string;
    value: number;
    amount: number;
    }

export interface Variable{
  name: string;
  value: number | string | boolean;
}
  