import { AiTwotoneDelete } from "react-icons/ai";
import { MdDeleteOutline } from "react-icons/md";
import styled from "styled-components";

export const MainContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const VariableTableContainer = styled.div`
  margin-top: 40px;
  display: flex;
  height: 500px;
  flex-direction: column;
  flex: 0.25;
  background-color: #212529;
  border-radius: 20px;
  border: 3px solid #fecf43;
`;

export const VariableTableHeading = styled.div`
  height: 15%;
  justify-content: center;
  display: flex;
  padding: 30px;
  align-items: center;
`;
export const VariableTableBody = styled.div`
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
  height: 100%;
`;
export const Line = styled.div`
  width: 100%;
  height: 3px;

  background-color: #fecf43;
`;

export const VariableContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  height: 30px;
  padding-bottom: 20px;
  padding-top: 20px;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 10px;
`;

export const VariableTitle = styled.h1`
  color: #fecf43;
  margin-right: 60px;
  font-weight: bold;
  font-size: 35px;
`;

export const VariableText = styled.div`
  color: #fecf43;
  justify-content: center;
  align-items: center;
  font-size: 15px;
  display: flex;
  flex: 1;
  text-overflow: ellipsis;
`;

export const DeleteButton = styled(AiTwotoneDelete)`
  color: red;
  height: 23px;
  align-items: center;
  width: 23px;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;
