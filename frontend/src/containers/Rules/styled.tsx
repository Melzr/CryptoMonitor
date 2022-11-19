import styled from "styled-components";

interface Props {
  isSelected: boolean;
}

export const MainContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 15px;
`;

export const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const DescriptionContainer = styled.div`
  display: flex;
  flex: 3;
  margin-left: 15px;
  background-color: #212529;
  font-size: 20px;
  padding: 10px;
  border: 2px solid #4d4d4d;
`;

export const Option = styled.div<Props>`
  justify-items: center;
  align-items: center;
  display: flex;
  color: ${(props) => (props.isSelected ? "black" : "#fecf43")};
  background-color: #212529;
  text-align: center;
  font-size: 20px;
  padding: 10px;
  border: 2px solid #4d4d4d;
  cursor: pointer;
  width: 100%;
  &:hover {
    color: black;
    background-color: #fecf43;
  }
  margin-bottom: 3px;
`;
