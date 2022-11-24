import { AppDispatch } from "..";
import axios from 'axios';
import { baseURL } from "../../config";

export type AuthAction = {
  type: "LOGIN";
  payload: string;
} | {
  type: "LOGOUT";
}

export const login = (email: string, password: string) => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.post(`${baseURL}/api/token`, { email, password });
    dispatch({ type: "LOGIN", payload: response.data });
  } catch(e) {
    if (axios.isAxiosError(e)) {
      throw e.response?.data.error?? 'Unexpected error. Try again later';
    }
    throw 'Unexpected error. Try again later';
  }
};

export const googleLogin = (googleToken: string) => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.post(`${baseURL}/api/token/google`, {}, {
      headers: { Authorization: `Bearer ${googleToken}` }
    });
    dispatch({ type: "LOGIN", payload: response.data });
  } catch (e) {
    if (axios.isAxiosError(e)) {
      throw e.response?.data.error?? 'Unexpected error. Try again later';
    }
    throw 'Unexpected error. Try again later';
  }
};

export const createAccount = (email: string, password: string) => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.post(`${baseURL}/api/user`, { email, password });
    dispatch({ type: "LOGIN", payload: response.data });
  } catch(e) {
    if (axios.isAxiosError(e)) {
      throw e.response?.data.error?? 'Unexpected error. Try again later';
    }
    throw 'Unexpected error. Try again later';
  }
};

export const logout = () => async (dispatch: AppDispatch) => {
  dispatch({ type: "LOGOUT" });
};

