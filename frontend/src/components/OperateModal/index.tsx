import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { BodyText, TextContainer, WalletModalInput } from "./styled";
import Form from "react-bootstrap/Form";
import { selectCurrentCoin } from "../../state/selectors/walletSelector";
import { GenericButton } from "../Button";
import { useAppDispatch, useAppSelector } from "../../state";
import { buyCoin, sellCoin } from "../../state/actions/walletAction";
import { useState } from "react";
import { ErrorModal } from "../ErrorModal";
import { LoadingSpinner } from "../LoadingSpinner";

type Props = {
  onHide: () => void;
  show: boolean;
};

export const WalletModal = (props: Props) => {
  const selectedCoin = useAppSelector(selectCurrentCoin);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState("");
  const dispatch = useAppDispatch();

  const handleBuyClick = async () => {
    setLoading(true);
    try {
      await dispatch(buyCoin(selectedCoin.symbol, parseFloat(amount)));
    } catch (error) {
      setError(error as string);
    }
    setLoading(false);
    if (error !== "") props.onHide();
  };

  const handleSellClick = async () => {
    setLoading(true);
    try {
      dispatch(sellCoin(selectedCoin.symbol, parseFloat(amount)));
    } catch (error) {
      setError(
        (error as { message?: string }).message ??
          "Unexpected error. Try again later."
      );
    }
    setLoading(false);
    if (error !== "") props.onHide();
  };

  return (
    <Modal show={props.show} centered onHide={props.onHide}>
      <ErrorModal
        error={error}
        show={error !== ""}
        onHide={() => setError("")}
      />
      <LoadingSpinner loading={loading} />
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
            onChange={(e) => setAmount(e.target.value)}
            placeholder="  Enter a value"
          />
        </TextContainer>
      </Modal.Body>
      <Modal.Footer>
        <GenericButton onClick={handleSellClick} text={"Sell"} />
        <GenericButton onClick={handleBuyClick} text={"Buy"} />
      </Modal.Footer>
    </Modal>
  );
};
