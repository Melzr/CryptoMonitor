import { combineReducers } from "redux";
import rulesReducer from "./rulesReducer";

import walletReducer from "./walletReducer";

export const rootReducer = combineReducers({
  wallet: walletReducer,
  rules: rulesReducer,
});
