import React, { useEffect } from "react";
import { MainContainer, SellButton, BuyButton, OperateButton } from "./styled";
import Table from "react-bootstrap/Table";
import { Button } from "react-bootstrap";
import { WalletModal } from "../../components/OperateModal";
import { Console } from "console";
import { useDispatch } from "react-redux";
import { setSelectedCoin } from "../../state/actions";
import { Coin } from "../../interfaces/interfaces";

export const Wallet = () => {

  const COINS: Coin[] = [
    {
      name: "BTC",
      price: 16500,
      amount:0.010200,
    },
    {
      name: "ETH",
      price: 214412,
      amount:0.02142,
    },
    {
      name: "BNB",
      price: 214412,
      amount: 0.1440020,
    },
    {
      name: "CHZ",
      price: 0.2441,
      amount:0.00,
    },
    {
      name: "SOL",
      price: 12.81,
      amount:43,
    },
    {
      name: "ADA",
      price: 0.3261,
      amount:0.00,
    },
    {
      name: "DOT",
      price: 5.70,
      amount:0.00,
    },
  ];

  const [modalShow, setModalShow] = React.useState(false);
  const dispatch = useDispatch();

  const handleClick = (coin: Coin) => {
    setModalShow(true);
    dispatch(setSelectedCoin(coin));
  }


  return (
    <MainContainer>
      <WalletModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
      <table className="table table-striped table-dark">
        <thead className="header-container">
          <tr>
            <th scope="col" className="wallet-header">
              Nombre
            </th>
            <th scope="col" className="wallet-header">
              Cotizacion
            </th>
            <th scope="col" className="wallet-header">
              Balance
            </th>
            <th scope="col" className="operate-header"></th>
          </tr>
        </thead>
        <tbody>
          {COINS.map((coin) => {
            return (
              <tr>
                <td className="wallet-cell">{coin.name}</td>
                <td className="wallet-cell">{coin.price}</td>
                <td className="wallet-cell">{coin.amount}</td>
                <td className="operate-column">
                  <OperateButton onClick={() => handleClick(coin)}>
                    Operar
                  </OperateButton>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </MainContainer>
  );
};
