export type WalletAction =
  {
      type: "SELECT_COIN";
      coin: Object;
    }

export const setSelectedCoin = (coin: Object): WalletAction => ({
  type: "SELECT_COIN",
  coin,
});
