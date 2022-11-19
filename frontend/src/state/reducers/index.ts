import { combineReducers } from "redux";

import { higherOrderReducer } from "./higherOrderReducer";
import walletReducer from "./walletReducer";

export const rootReducer = higherOrderReducer(
  combineReducers({
    wallet: walletReducer,
  })
);
