import styled from "styled-components";

export const Text = styled.div`
  font-size: 18px;
  color: white;
`;

export const EditInput = styled.textarea`
  width: 100%;
  background-color: rgba(0, 0, 0, 0.1);
  color: white;
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
