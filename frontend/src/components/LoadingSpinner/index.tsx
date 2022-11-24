import Spinner from "react-bootstrap/Spinner";
import Modal from "react-bootstrap/Modal";

type Props = {
  loading: boolean;
};

export const LoadingSpinner = ({ loading }: Props) => {
  return (
    <Modal show={loading} centered>
      <Modal.Body>
        Loading...
        <Spinner animation="border" role="status" />
      </Modal.Body>
    </Modal>
  );
};
