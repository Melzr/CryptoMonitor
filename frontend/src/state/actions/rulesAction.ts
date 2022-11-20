export type RulesAction = {
    type: "SELECT_RULE";
    name: String;
  };
  
  export const setSelectedRule = (name: String): RulesAction => ({
    type: "SELECT_RULE",
    name,
  });
  