import { RootState } from '..';
import { Coin } from '../../interfaces/interfaces';

export const selectCurrentCoin = (state: RootState): Coin => {
  return state.wallet.coin;
};
