import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { EditInput, Text } from "./styled";
import Form from "react-bootstrap/Form";
import { selectCurrentCoin } from "../../state/selectors/walletSelector";
import { GenericButton } from "../Button";
import { selectCurrentRule } from "../../state/selectors/rulesSelector";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../state";
import { editRule } from "../../state/actions/rulesAction";

type Props = {
  onHide: () => void;
  show: boolean;
};



export const NewCoinModal = (props: Props) => {

  const handleClick = () => {
    props.onHide();
  }

  return (
    <Modal show={props.show} centered onHide={props.onHide}>
      <Modal.Header closeButton closeVariant="white">
        <Modal.Title>
          Buy coin
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
          
      </Modal.Body>
      <Modal.Footer>
        <GenericButton onClick={props.onHide} text={"Cancel"} />
        <GenericButton onClick={handleClick} text={"Confirm"} />
      </Modal.Footer>
    </Modal>
  );
};
