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
  isEdit: boolean;
};



export const EditRuleModal = (props: Props) => {
  const selectedRule = useAppSelector(selectCurrentRule);
  const [rule, setRule] = useState(JSON.stringify(selectedRule, null, "\t"));
  
  const dispatch = useAppDispatch();
  const handleEditConfirm = () => {
    console.log(rule);
    dispatch(editRule(rule));
    
  } 

  const handleClick = () => {
    handleEditConfirm();
    props.onHide();
  }

  useEffect(() => {
    setRule(JSON.stringify(selectedRule, null, "\t"));
  }, [selectedRule]);

  return (
    <Modal show={props.show} centered onHide={props.onHide}>
      <Modal.Header closeButton closeVariant="white">
        <Modal.Title>
          {props.isEdit ? (
            <div>Edit rule</div>
          ) : (
            <div>Add rule</div>
          )}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {props.isEdit ? (
          <EditInput
          rows={10}
          value={rule}
          onChange={(e) => setRule(e.target.value)}
        />
        ) : (
          <EditInput
            rows={10}
            onChange={(e) => setRule(e.target.value)}
          />
        )}
      </Modal.Body>
      <Modal.Footer>
        <GenericButton onClick={props.onHide} text={"Cancel"} />
        <GenericButton onClick={handleClick} text={"Confirm"} />
      </Modal.Footer>
    </Modal>
  );
};
