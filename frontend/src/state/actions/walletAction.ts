import axios from "axios";
import { AppDispatch, RootState } from "..";
import { baseURL } from "../../config";
import { Coin } from "../../interfaces/interfaces";
import { logout } from "./authAction";

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

export const getCoins = () => async (dispatch: AppDispatch, getState: () => RootState) => {
  const token = getState().auth.token;

  try {
    const requestURL: string = baseURL + "/api/wallet/"
    const result = await axios.get(requestURL, { headers: { Authorization: `Bearer ${token}` } });
    dispatch(fetchCoins(result.data));
  } catch (e) {
    if (axios.isAxiosError(e)) {
      if (e.response?.status === 401) {
        dispatch(logout());
      } else {
        throw e.response?.data.error;
      }
    }
  }
};

export const buyCoin = (symbol: String, amount: number) => async (dispatch: AppDispatch, getState: () => RootState) => {
  const token = getState().auth.token;

  try {
    const requestURL: string = `${baseURL}/api/wallet/buy`;
    const requestCoin = { "symbol": symbol, "amount" : amount };
    const result = await axios.post(requestURL, requestCoin, { headers: { Authorization: `Bearer ${token}` } });
    dispatch(getCoins());
  } catch (e) {
    if (axios.isAxiosError(e)) {
      if (e.response?.status === 401) {
        dispatch(logout());
      } else {
        throw e.response?.data.error;
      }
    } else {
      throw e;
    }
  }
};

export const sellCoin = (symbol: String, amount: number) => async (dispatch: AppDispatch, getState: () => RootState) => {
  const token = getState().auth.token;
  try {
    const requestURL: string = `${baseURL}/api/wallet/sell`;
    const requestCoin = { "symbol": symbol, "amount" : amount };
    const result = await axios.post(requestURL,  requestCoin, { headers: { Authorization: `Bearer ${token}` } });
    dispatch(getCoins());
  } catch (e) {
    if (axios.isAxiosError(e)) {
      if (e.response?.status === 401) {
        dispatch(logout());
      } else {
        throw e.response?.data.error;
      }
    }
  }
};