import { RootState } from '..';
import { Variable } from '../../interfaces/interfaces';

export const selectCurrentVariable = (state: RootState): Variable => {
  return state.variables.variable;
};


export const selectVariables = (state: RootState): Variable[] => {
  return state.variables.variables;
};