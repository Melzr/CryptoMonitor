import axios from "axios";
import { AppDispatch } from "..";
import { baseURL } from "../../config";
import { Coin } from "../../interfaces/interfaces";

export type WalletAction = {
  type: "SELECT_COIN";
  coin: Coin;
} |
{
  type: "FETCH_COINS";
  coins: Coin[];
}

export const setSelectedCoin = (coin: Coin): WalletAction => ({
  type: "SELECT_COIN",
  coin,
});

const fetchCoins = (coins: Coin[]): WalletAction => ({
  type: "FETCH_COINS",
  coins
})

export const getCoins = () => async (dispatch: AppDispatch) => {
  try {
    const requestURL: string = baseURL + "/api/wallet/"
    const result = await axios.get(requestURL);
    dispatch(fetchCoins(result.data));
    console.log(result.data);
  } catch (e) { /* do nothing */ console.log(e)}
};