import { Coin } from "../../interfaces/interfaces";

export type WalletAction = {
  type: "SELECT_COIN";
  coin: Coin;
};

export const setSelectedCoin = (coin: Coin): WalletAction => ({
  type: "SELECT_COIN",
  coin,
});
