import styled from "styled-components";

//pasar a components
export const OperateButton = styled.button`
    width: 100px;
    height: 30px;
    font-size: 20px;
    background-color: #fecf43;
    border: none;
    color: #000000cc;
    font-weight: bold;
    border-radius: 10px;
    &:hover {
        cursor: pointer;
    background-color: #c59400;
    }
    margin: 5px;
`;

export const TextContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    padding: 25px;
    margin-left: 20px;
`;

export const BodyText = styled.p`
    font-size: 25px;
    margin-left: 10px;
    color: ${(props) => props.color};
`;

export const WalletModalInput = styled.input`
    border-radius: 10px;
    height: 40px;
    margin-left: 10px;
    padding: 5px;
`