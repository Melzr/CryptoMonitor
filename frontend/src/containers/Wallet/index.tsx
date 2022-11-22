import React, { useEffect } from "react";
import { MainContainer, SellButton, BuyButton, OperateButton } from "./styled";
import Table from "react-bootstrap/Table";
import { Button } from "react-bootstrap";
import { WalletModal } from "../../components/OperateModal";
import { Console } from "console";
import { useDispatch } from "react-redux";
import { setSelectedCoin } from "../../state/actions";
import { Coin } from "../../interfaces/interfaces";
import { useAppDispatch, useAppSelector } from "../../state";
import { selectCoins } from "../../state/selectors/walletSelector";
import { getCoins } from "../../state/actions/walletAction";

export const Wallet = () => {

  const COINS: Coin[] = [
    {
      symbol: "BTC",
      price: 16500,
      amount:0.010200,
    },
    {
      symbol: "ETH",
      price: 214412,
      amount:0.02142,
    },
    {
      symbol: "BNB",
      price: 214412,
      amount: 0.1440020,
    },
    {
      symbol: "CHZ",
      price: 0.2441,
      amount:0.00,
    },
    {
      symbol: "SOL",
      price: 12.81,
      amount:43,
    },
    {
      symbol: "ADA",
      price: 0.3261,
      amount:0.00,
    },
    {
      symbol: "DOT",
      price: 5.70,
      amount:0.00,
    },
  ];

  const [modalShow, setModalShow] = React.useState(false);
  const dispatch = useAppDispatch();

  const handleClick = (coin: Coin) => {
    setModalShow(true);
    dispatch(setSelectedCoin(coin));
  }

  const coins = useAppSelector(selectCoins);
  console.log(coins);
  useEffect(() => {
    dispatch(getCoins());
    }, []);

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
              Amount
            </th>
            <th scope="col" className="operate-header"></th>
          </tr>
        </thead>
        <tbody>
          {coins.map((coin) => {
            return (
              <tr>
                <td className="wallet-cell">{coin.symbol}</td>
                <td className="wallet-cell">naue hace el endpoint</td>
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
