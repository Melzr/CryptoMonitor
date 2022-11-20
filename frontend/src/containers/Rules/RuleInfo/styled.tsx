import styled from "styled-components";
import { AiTwotoneDelete } from "react-icons/ai";

interface ValueProps {
  marginSize: number;
}

export const RuleContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
`;

export const ValueBox = styled.div<ValueProps>`
  display: flex;
  flex-direction: column;
  margin-left: ${(props) => String(props.marginSize * 15) + "px"};
`;

export const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const Line = styled.div`
  width: 100%;
  height: 2px;
  color: rgb(255, 253, 253);
`;

export const RuleTitle = styled.h2`
  color: #fecf43;
  text-transform: uppercase;
`;

export const RuleSubtitle = styled.h4`
  color: #fecf43;
  text-decoration: underline;
`;

export const ConditionContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const ActionContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;
