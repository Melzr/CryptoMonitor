import { RootState } from '..';
import { Rule } from '../../interfaces/interfaces';

export const selectCurrentRule = (state: RootState): Rule | null => {
  return state.rules.rule;
};


export const selectRules = (state: RootState): Rule[] => {
  return state.rules.rules;
};
