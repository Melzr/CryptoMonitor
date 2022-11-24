import { AnyAction, Reducer } from "redux";
import { Variable } from "../../interfaces/interfaces";

export type VariablesState = {
  variable: Variable;
  variables: Variable[];
};

const initialState = {
    variable: {
        name: "",
        value: "",
    },
    variables:[],
}

  const variablesReducer: Reducer<VariablesState, AnyAction> = (state = initialState, action) => {
    switch (action.type) {
      case 'SELECT_VARIABLE':
        return {
          variable: action.variable,
          variables: state.variables
        };
     case 'FETCH_VARIABLES':
        return {
            variable: state.variable,
            variables: action.variables,
        };
      default:
        return state;
    }
  }
export default variablesReducer;