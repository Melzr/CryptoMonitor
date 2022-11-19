import { RootState } from '..';

export const selectCurrentCoin = (state: RootState): String => {
  return state.wallet.coin;
};
