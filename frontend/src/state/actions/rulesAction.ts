import { Rule } from "../../interfaces/interfaces";
import {baseURL} from "../../config";
import { AppDispatch, RootState } from "..";
import axios from 'axios';
import { parse } from "path";
import { logout } from "./authAction";

export type RulesAction = {
    type: "SELECT_RULE";
    rule: Rule;
  } |
  {
    type: "FETCH_RULES_FINISHED";
    rules: Rule[];
  }

  export const setSelectedRule = (rule: Rule ): RulesAction => ({
    type: "SELECT_RULE",
    rule,
  });

  const fetchRulesFinished = (rules: Rule[]): RulesAction => ({
    type: "FETCH_RULES_FINISHED",
    rules
  })

  export const deleteRule = (name: string) => async (dispatch: AppDispatch, getState: () => RootState) => {
    const token = getState().auth.token;
    
    try {
      const requestURL: string = `${baseURL}/api/rules/${name}`;
      const result = await axios.delete(requestURL, { headers: { Authorization: `Bearer ${token}` } });
      dispatch(getRules());
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

  export const saveRule = (rule: string) => async (dispatch: AppDispatch, getState: () => RootState) => {
    const token = getState().auth.token;
    try {
      const requestRule = JSON.parse(rule);
      const requestURL: string = `${baseURL}/api/rules/`;
      const result = await axios.post(requestURL, {rule: requestRule}, { headers: { Authorization: `Bearer ${token}` }});
      dispatch(getRules());
    } catch (e) {
      if (axios.isAxiosError(e)) {
        if (e.response?.status === 401) {
          dispatch(logout());
        } else {
          throw e.response?.data.error;
        }
      } else {
        throw "Invalid rule";
      }
    }
  };

  export const getRules = () => async (dispatch: AppDispatch, getState: () => RootState) => {
    const token = getState().auth.token;
    try {
      const requestURL: string = `${baseURL}/api/rules`;
      const result = await axios.get(requestURL, { headers: { Authorization: `Bearer ${token}` }});
      dispatch(fetchRulesFinished(result.data));
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