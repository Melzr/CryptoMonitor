import styled from "styled-components";

export const InformationContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  height: 100px;
  align-items: center;
`;

export const WalletModalInput = styled.input`
  border-radius: 10px;
  height: 40px;
`;

export const BodyText = styled.div`
  text-align: center;
  justify-content: center;
  font-size: 25px;
  color: ${(props) => props.color};
`;
