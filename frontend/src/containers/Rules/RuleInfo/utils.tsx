import { ValueType } from "../../../interfaces/interfaces";
import { ValueBox } from "./styled";

export const showValue = (value: ValueType, spacing: number) => {
  return (
    <ValueBox marginSize={spacing}>
      {value.type}
      {describeValue(value, spacing)}
    </ValueBox>
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
          <div>{"Symbol: " + value.symbol}</div>;
          <div>{"From: " + value.from}</div>;
          <div>{"Until: " + value.until}</div>;
        </div>
      );
  }
};
