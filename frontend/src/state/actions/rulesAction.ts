import { Rule } from "../../interfaces/interfaces";

export type RulesAction = {
    type: "SELECT_RULE";
    rule: Rule;
  };
  
  export const setSelectedRule = (rule: Rule): RulesAction => ({
    type: "SELECT_RULE",
    rule,
  });
  