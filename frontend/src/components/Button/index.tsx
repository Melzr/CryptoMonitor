import React from "react";
import { OperateButton } from "./styled";

type Props = {
  onClick: () => void;
  text: string;
};

export const GenericButton = (props: Props) => {
  return <OperateButton onClick={props.onClick}>{props.text}</OperateButton>;
};
