import { Rule } from "../../interfaces/interfaces";
import {baseURL} from "../../config";
import { AppDispatch } from "..";
import axios from 'axios';
import { parse } from "path";

export type RulesAction = {
    type: "SELECT_RULE";
    rule: Rule;
  } |
  {
    type: "FETCH_RULES_FINISHED";
    rules: Rule[];
  }

  export const setSelectedRule = (rule: Rule): RulesAction => ({
    type: "SELECT_RULE",
    rule,
  });

  const fetchRulesFinished = (rules: Rule[]): RulesAction => ({
    type: "FETCH_RULES_FINISHED",
    rules
  })

  export const deleteRule = (name: string) => async (dispatch: AppDispatch) => {
    try {
      const requestURL: string = `${baseURL}/api/rules/${name}`;
      const result = await axios.delete(requestURL);
      dispatch(getRules());
    } catch (e) { /* do nothing */ console.log(e)}
  };

  export const editRule = (rule: string) => async (dispatch: AppDispatch) => {
    const requestRule = JSON.parse(rule);
    try {
      const requestURL: string = `${baseURL}/api/rules/`;
      const result = await axios.post(requestURL, {rule: requestRule});
      dispatch(getRules());
    } catch (e) { /* do nothing */ console.log(e)}
  };

  export const getRules = () => async (dispatch: AppDispatch) => {
    try {
      const requestURL: string = `${baseURL}/api/rules`;
      const result = await axios.get(requestURL);
      dispatch(fetchRulesFinished(result.data));
    } catch (e) { /* do nothing */ console.log(e)}
  };