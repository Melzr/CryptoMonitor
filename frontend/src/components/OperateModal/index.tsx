import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import {
  BodyText,
  TextContainer,
  WalletModalInput,
} from "./styled";
import Form from "react-bootstrap/Form";
import { selectCurrentCoin } from "../../state/selectors/walletSelector";
import { GenericButton } from "../Button";
import { useAppDispatch, useAppSelector } from "../../state";
import { buyCoin, sellCoin } from "../../state/actions/walletAction";
import { useState } from "react";

type Props = {
  onHide: () => void;
  show: boolean;
};



export const WalletModal = (props: Props) => {
  const selectedCoin = useAppSelector(selectCurrentCoin);
  const [amount, setAmount] = useState(0);
  const dispatch = useAppDispatch();

  const handleBuyClick = () => {
    dispatch(buyCoin(selectedCoin.symbol, amount));
    props.onHide();
  }

  const handleDeleteClick = () => {
    dispatch(sellCoin( selectedCoin.symbol, amount));
    props.onHide();
  }

  return (
    <Modal show={props.show} centered onHide={props.onHide}>
      <Modal.Header closeButton closeVariant="white">
        <Modal.Title>Operate {selectedCoin.symbol}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <TextContainer>
          <BodyText>Cotizacion:</BodyText>
          <BodyText color="white">2020</BodyText>
        </TextContainer>
        <TextContainer>
          <BodyText>Balance:</BodyText>
          <BodyText color="white">{selectedCoin.amount}</BodyText>
        </TextContainer>
        <TextContainer>
          <BodyText>Amount:</BodyText>
          <WalletModalInput
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            type="number"
            min="0"
            placeholder="  Enter a value"

          />
        </TextContainer>
      </Modal.Body>
      <Modal.Footer>
        <GenericButton onClick={handleDeleteClick} text={"Sell"} />
        <GenericButton onClick={handleBuyClick} text={"Buy"} />
      </Modal.Footer>
    </Modal>
  );
};
