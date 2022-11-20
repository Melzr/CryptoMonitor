import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useSelector } from "react-redux";
import { selectCurrentCoin } from "../../state/selectors/walletSelector";
import { GenericButton } from "../Button";
import { Text } from "./styled";

type Props = {
  onHide: () => void;
  onConfirm: () => void;
  show: boolean;
  title: string;
  text: string;
};

export const ConfirmationModal = (props: Props) => {

    const handleClick = () => {
        props.onConfirm();
        props.onHide();
    }

  return (
    <Modal show={props.show} centered onHide={props.onHide}>
      <Modal.Header closeButton closeVariant="white">
        <Modal.Title>{props.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Text>{props.text}</Text>
      </Modal.Body>
      <Modal.Footer>
        <GenericButton onClick={handleClick} text={"Confirm"} />
        <GenericButton onClick={props.onHide} text={"Cancel"} />
      </Modal.Footer>
    </Modal>
  );
};
