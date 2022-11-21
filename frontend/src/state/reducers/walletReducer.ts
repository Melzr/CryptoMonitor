import { Reducer } from "redux";
import { Coin } from "../../interfaces/interfaces";
import { AppAction } from "../AppAction";

export type WalletState = {
  coin: Coin;
};

const initialState = {
  coin:{
    name: "",
    amount: 0,
    price: 0,
  },
}

const walletReducer: Reducer<WalletState, AppAction> = (state = initialState, action) => {
  switch (action.type) {
    case 'SELECT_COIN':
      return {
        coin: action.coin,
      };
    default:
      return state;
  }
}


export default walletReducer;