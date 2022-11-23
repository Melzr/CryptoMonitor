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
  } catch (e) { /* do nothing */ console.log(e)}
};

export const buyCoin = (symbol: String, amount: number) => async (dispatch: AppDispatch) => {
  try {
    const requestURL: string = `${baseURL}/api/wallet/buy`;
    const requestCoin = { "symbol": symbol, "amount" : amount };
    const result = await axios.post(requestURL, requestCoin);
    dispatch(getCoins());
  } catch (e) { /* do nothing */ console.log(e)}
};

export const sellCoin = (symbol: String, amount: number) => async (dispatch: AppDispatch) => {
  try {
    const requestURL: string = `${baseURL}/api/wallet/sell`;
    const requestCoin = { "symbol": symbol, "amount" : amount };
    const result = await axios.post(requestURL,  requestCoin);
    dispatch(getCoins());
  } catch (e) { /* do nothing */ console.log(e)}
};