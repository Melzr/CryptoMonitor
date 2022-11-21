import styled from "styled-components";
import { AiTwotoneDelete } from "react-icons/ai";

interface Props {
  isSelected: boolean;
}

interface ButtonProps {
  isDelete: boolean;
}

export const MainContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  padding: 15px;
`;

export const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  flex-shrink: 0;
  height: 600px;
  overflow: scroll;
  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #6a6a6a;
    border-radius: 10px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #6a6a6a;
  }
  ::-webkit-scrollbar-corner {
    background: rgba(0, 0, 0, 0);
  }
`;

export const DescriptionContainer = styled.div`
  display: flex;
  flex: 4;
  color: white;
  margin-left: 15px;
  background-color: #212529;
  height: 600px;
  width: 100%;
  font-size: 20px;
  padding: 10px;
  border: 2px solid #4d4d4d;
  overflow: scroll;
  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #6a6a6a;
    border-radius: 10px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #6a6a6a;
  }
  ::-webkit-scrollbar-corner {
    background: rgba(0, 0, 0, 0);
  }
`;

export const Option = styled.div<Props>`
  justify-content: space-between;
  align-items: center;
  display: flex;
  color: ${(props) => (props.isSelected ? "black" : "white")};
  background-color: ${(props) => (props.isSelected ? "#7c848a" : "#212529")};
  text-align: center;
  font-size: 20px;
  padding: 10px;
  border: 2px solid #4d4d4d;
  cursor: pointer;
  width: 100%;
  margin-bottom: 3px;
`;

export const RuleButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  &:hover {
    opacity: 0.6;
  }
`;

export const OperateButton = styled.button<ButtonProps>`
  width: 80px;
  height: 100%;
  font-size: 18px;
  background-color: ${(props) => (props.isDelete ? "#c00808" : "#fecf43")};
  border: none;
  color: #000000cc;
  font-weight: bold;
  border-radius: 10px;
  &:hover {
    cursor: pointer;
    background-color: ${(props) => (props.isDelete ? "#670707" : "#c59400")};
    color: #000000cc;
  }
  margin: 5px;
`;

