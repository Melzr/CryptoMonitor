import { Rule } from "../../interfaces/interfaces";
import {baseURL} from "../../config";
import { Dispatch } from 'redux'
import { AppDispatch } from "..";
import axios from 'axios';

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

  export const getRules = () => async (dispatch: AppDispatch) => {
    try {
      const requestURL: string = baseURL + "/api/rules/"
      const result = await axios.get(requestURL);
      dispatch(fetchRulesFinished(result.data));
      console.log(result.data);
    } catch (e) { /* do nothing */ console.log(e)}
  };