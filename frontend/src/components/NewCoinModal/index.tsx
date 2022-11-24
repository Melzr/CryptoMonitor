import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { InformationContainer, WalletModalInput, BodyText } from "./styled";
import Form from "react-bootstrap/Form";
import { selectCurrentCoin } from "../../state/selectors/walletSelector";
import { GenericButton } from "../Button";
import { selectCurrentRule } from "../../state/selectors/rulesSelector";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../state";
import { saveRule } from "../../state/actions/rulesAction";
import { buyCoin } from "../../state/actions/walletAction";
import { ErrorModal } from "../ErrorModal";
import { LoadingSpinner } from "../LoadingSpinner";

type Props = {
  onHide: () => void;
  show: boolean;
};

export const NewCoinModal = (props: Props) => {
  const dispatch = useAppDispatch();
  const [amount, setAmount] = useState(0);
  const [symbol, setSymbol] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleBuyClick = async () => {
    setLoading(true);
    try {
      await dispatch(buyCoin(symbol, amount));
    } catch (error) {
      setError(error as string);
    }
    setLoading(false);
    if (error !== "") props.onHide();
  };

  return (
    <Modal
      className="BuyCoinModal"
      show={props.show}
      centered
      onHide={props.onHide}
    >
      <ErrorModal error={error} show={error !== ""} onHide={() => setError("")} />
      <LoadingSpinner loading={loading} />
      <Modal.Header className="BuyModalHeader" closeButton closeVariant="white">
        <Modal.Title>Buy coin</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <InformationContainer>
          <BodyText>Symbol:</BodyText>
          <WalletModalInput
            value={symbol}
            onChange={(e) => setSymbol(e.target.value)}
            type="string"
            placeholder="  Enter a symbol"
          />
        </InformationContainer>
        <InformationContainer>
          <BodyText>Amount:</BodyText>
          <WalletModalInput
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            type="number"
            min="0"
            placeholder="  Enter an amount"
          />
        </InformationContainer>
      </Modal.Body>
      <Modal.Footer>
        <GenericButton onClick={props.onHide} text={"Cancel"} />
        <GenericButton onClick={handleBuyClick} text={"Confirm"} />
      </Modal.Footer>
    </Modal>
  );
};
