import { ActionType, ValueType } from "../../../interfaces/interfaces";
import { Box } from "./styled";

export const showValue = (value: ValueType, spacing: number) => {
  return (
    <Box marginSize={spacing}>
      {value.type}
      {describeValue(value, spacing)}
    </Box>
  );
};

const describeValue = (value: ValueType, spacing: number) => {
  switch (value.type) {
    case "CONSTANT":
      return <div>{"Value: " + value.value} </div>;
    case "VARIABLE":
      return <div>{"Name: " + value.name}</div>;
    case "WALLET":
      return <div>{"Symbol: " + value.symbol} </div>;
    case "CALL":
      return (
        <div>
          <div>{"Name: " + value.name}</div>
          <div>
            {"Arguments: { "}
            {value.arguments.map((argument) => (
              <div>{showValue(argument, spacing + 1)}</div>
            ))}
            {"}"}
          </div>
        </div>
      );
    case "DATA":
      return (
        <div>
          <div>{"Symbol: " + value.symbol}</div>
          <div>{"From: " + value.from}</div>
          <div>{"Until: " + value.until}</div>
        </div>
      );
  }
};

export const showAction = (action: ActionType[], spacing: number) => {
  return (
    <Box marginSize={spacing}>
      {action.map((action) => (
        <div>
          <div>{"{"}</div>
          {action.type}
          {describeAction(action, spacing)}
          <div>{"}"}</div>
        </div>
      ))}
    </Box>
  );
};

const describeAction = (action: ActionType, spacing: number) => {
  switch (action.type) {
    case "BUY_MARKET":
      return (
        <div>
          <div>{"Symbol: " + action.symbol}</div>
          <div>{"Amount: "}</div>
          {showValue(action.amount, spacing + 1)}
        </div>
      );
    case "SELL_MARKET":
      return (
        <div>
          <div>{"Symbol: " + action.symbol}</div>
          <div>{"Amount: "}</div>
          {showValue(action.amount, spacing + 1)}
        </div>
      );
    case "SET_VARIABLE":
      return (
        <div>
          <div>{"Name: " + action.name}</div>
           <div>{"Value: "}</div>
          {showValue(action.value, spacing + 1)}
        </div>
      );
  }
};
