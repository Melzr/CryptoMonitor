import { Reducer } from "redux";
import { Rule } from "../../interfaces/interfaces";
import { AppAction } from "../AppAction";

export type RulesState = {
  rule: Rule | null;
};

const initialState = {
  rule: null,
}

const rulesReducer: Reducer<RulesState, AppAction> = (state = initialState, action) => {
  switch (action.type) {
    case 'SELECT_RULE':
      return {
        rule: action.rule,
      };
    default:
      return state;
  }
}


export default rulesReducer;