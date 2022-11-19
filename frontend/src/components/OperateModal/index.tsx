import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

type Props = {
    onHide: (event: React.MouseEvent<HTMLButtonElement>) => void;
    show: boolean;
    name: string;
}

export const MyVerticallyCenteredModal = (props: Props) =>  {
    return (
        <Modal show={props.show} centered>
        <Modal.Header >
          <Modal.Title>
            Operate {props.name}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h1>hola</h1>
          <h1>hola</h1>
          <h1>hola</h1>
          <h1>hola</h1>
          <h1>hola</h1>
          <h1>hola</h1>
          <h1>hola</h1>
          <h1>hola</h1>
          <h1>hola</h1>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }