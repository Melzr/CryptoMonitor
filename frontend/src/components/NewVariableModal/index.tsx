import Modal from "react-bootstrap/Modal";
import { InformationContainer, WalletModalInput, BodyText } from "./styled";
import { GenericButton } from "../Button";
import { useState } from "react";
import { useAppDispatch } from "../../state";
import { ErrorModal } from "../ErrorModal";
import { saveVariable } from "../../state/actions/variablesAction";
import { LoadingSpinner } from "../LoadingSpinner";

type Props = {
  onHide: () => void;
  show: boolean;
};

export const NewVariableModal = (props: Props) => {
  const dispatch = useAppDispatch();
  const [value, setValue] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(true);
    try {
      dispatch(saveVariable(name, value));
    } catch (error) {
      setError(error as string);
    }
    setLoading(false);
    if (error=== "") props.onHide();
  };

  return (
    <Modal
      className="NewVariableModal"
      show={props.show}
      centered
      onHide={props.onHide}
    >
      <ErrorModal
        error={error}
        show={error !== ""}
        onHide={() => setError("")}
      />
      <LoadingSpinner loading={loading} />
      <Modal.Header className="BuyModalHeader" closeButton closeVariant="white">
        <Modal.Title>New Variable</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <InformationContainer>
          <BodyText>Name:</BodyText>
          <WalletModalInput
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="string"
            placeholder="  Enter a name"
          />
        </InformationContainer>
        <InformationContainer>
          <BodyText>Value:</BodyText>
          <WalletModalInput
            value={value}
            onChange={(e) => setValue(e.target.value)}
            type="string"
            placeholder="  Enter an value"
          />
        </InformationContainer>
      </Modal.Body>
      <Modal.Footer>
        <GenericButton onClick={props.onHide} text={"Cancel"} />
        <GenericButton onClick={handleClick} text={"Confirm"} />
      </Modal.Footer>
    </Modal>
  );
};
