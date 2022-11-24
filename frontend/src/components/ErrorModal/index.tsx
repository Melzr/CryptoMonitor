import Modal from "react-bootstrap/Modal";
import { Text } from "./styled";

type Props = {
  onHide: () => void;
  error: string;
  show: boolean;
};

export const ErrorModal = (props: Props) => {

  return (
    <Modal show={props.show} centered onHide={props.onHide}>
      <Modal.Header closeButton closeVariant="white">
        <Modal.Title>{"Error"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Text>{props.error}</Text>
      </Modal.Body>
    </Modal>
  );
};
