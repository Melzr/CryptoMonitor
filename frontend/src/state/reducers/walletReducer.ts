import { Reducer } from "redux";
import { AppAction } from "../AppAction";

export type WalletState = {
  coin: String;
};

const initialState = {
  coin: "",
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