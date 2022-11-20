import { RootState } from '..';

export const selectCurrentRule = (state: RootState): String => {
  return state.rules.name;
};
