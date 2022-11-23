import { AnyAction, Reducer } from "redux";
import { Rule } from "../../interfaces/interfaces";

export type RulesState = {
  rule: Rule | null;
  rules: Rule[];
};

const initialState = {
  rule: null,
  rules: [],
}

  const rulesReducer: Reducer<RulesState, AnyAction> = (state = initialState, action) => {
    switch (action.type) {
      case 'SELECT_RULE':
        return {
          rule: action.rule,
          rules: state.rules,
        };
      case 'FETCH_RULES_FINISHED':
        return {
          rule: state.rule,
          rules: action.rules,
        };
      default:
        return state;
    }
  }

  

export default rulesReducer;