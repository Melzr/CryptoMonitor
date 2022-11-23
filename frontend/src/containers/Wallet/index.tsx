import React, { useEffect, useState } from "react";
import { MainContainer, SellButton, BuyButton, OperateButton, TableContainer, NewCoinButton } from "./styled";
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
import { MdAdd } from "react-icons/md";
import { NewCoinModal } from "../../components/NewCoinModal";

export const Wallet = () => {

  const [modalShow, setModalShow] = React.useState(false);
  const dispatch = useAppDispatch();
  const [showNewCoinModal, setShowNewCoinModal] = useState(false);
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
      <NewCoinModal
        show={showNewCoinModal}
        onHide={() => setShowNewCoinModal(false)}
      />
      <WalletModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
      <TableContainer>
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
              <th scope="col" className="operate-header"/>
            </tr>
          </thead>
          <tbody className="prueba">
            {coins.map((coin) => {
              return (
                <tr>
                  <td className="wallet-cell">{coin.symbol}</td>
                  <td className="wallet-cell">10000</td>
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
      </TableContainer>
      
        <NewCoinButton onClick={() => setShowNewCoinModal(true)}>
          <MdAdd color="#fecf43" size={45}/>
        </NewCoinButton>
      
    </MainContainer>
  );
};
