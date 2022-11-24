import { AnyAction, Reducer } from "redux";
import { Coin } from "../../interfaces/interfaces";
import { AppAction } from "../AppAction";

export type WalletState = {
  coin: Coin;
  coins: Coin[];
};

const initialState = {
  coin:{
    symbol: "",
    amount: 0,
    value: 0,
  },
  coins:[],
}

const walletReducer: Reducer<WalletState, AnyAction> = (state = initialState, action) => {
  switch (action.type) {
    case 'SELECT_COIN':
      return {
        coin: action.coin,
        coins: state.coins,
      };
    case 'FETCH_COINS':
      return {
        coin: state.coin,
        coins: action.coins,
      };
    default:
      return state;
  }
}

export default walletReducer;