import { Reducer } from "redux";
import { AppAction } from "../AppAction";

export type RulesState = {
  name: String;
};

const initialState = {
  name: "",
}

const rulesReducer: Reducer<RulesState, AppAction> = (state = initialState, action) => {
  switch (action.type) {
    case 'SELECT_RULE':
      return {
        name: action.name,
      };
    default:
      return state;
  }
}


export default rulesReducer;