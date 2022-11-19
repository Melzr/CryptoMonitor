export type WalletAction = {
  type: "SELECT_COIN";
  coin:String;
};

export const setSelectedCoin = (coin: String): WalletAction => ({
  type: "SELECT_COIN",
  coin,
});
