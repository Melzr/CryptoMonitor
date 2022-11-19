import styled from 'styled-components';


export const MainContainer = styled.div`
    width: 100%;
    height: 100%;
    padding: 20px;
`;	

export const SellButton = styled.button`
    width: 100px;
    height: 100%;
    font-size: 18px;
    background-color: rgb(189, 0, 0);
    border: none;
    color: white;
    border-radius: 10px;
    &:hover {
        cursor: pointer;
    background-color: #670707;
    }
    margin: 5px;
`;

export const BuyButton = styled.button`
    width: 100px;
    height: 100%;
    font-size: 18px;
    background-color: green;
    border: none;
    color: white;
    border-radius: 10px;
    &:hover {
        cursor: pointer;
    background-color: #004f00;

    }
    margin: 5px;
`;

export const OperateButton = styled.button`
    width: 100px;
    height: 100%;
    font-size: 18px;
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
