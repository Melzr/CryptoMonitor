import { RootState } from '..';
import { Coin } from '../../interfaces/interfaces';

export const selectCurrentCoin = (state: RootState): Coin => {
  return state.wallet.coin;
};


export const selectCoins = (state: RootState): Coin[] => {
  return state.wallet.coins;
};
