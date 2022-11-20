import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { EditInput, Text } from "./styled";
import Form from "react-bootstrap/Form";
import { useSelector } from "react-redux";
import { selectCurrentCoin } from "../../state/selectors/walletSelector";
import { GenericButton } from "../Button";
import { selectCurrentRule } from "../../state/selectors/rulesSelector";
import { useEffect, useState } from "react";

type Props = {
  onHide: () => void;
  show: boolean;
};

export const EditRuleModal = (props: Props) => {
  const selectedRule = useSelector(selectCurrentRule);
  const [rule, setRule] = useState(JSON.stringify(selectedRule, null, "\t"));
  
  useEffect(() => {
    setRule(JSON.stringify(selectedRule, null, "\t"));
  }, [selectedRule]);

  return (
    <Modal show={props.show} centered onHide={props.onHide}>
      <Modal.Header closeButton closeVariant="white">
        <Modal.Title>Edit rule</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <EditInput
          rows={10}
          value={rule}
          onChange={(e) => setRule(e.target.value)}
        />
      </Modal.Body>
      <Modal.Footer>
        <GenericButton onClick={props.onHide} text={"Cancel"} />
        <GenericButton onClick={props.onHide} text={"Confirm"} />
      </Modal.Footer>
    </Modal>
  );
};
