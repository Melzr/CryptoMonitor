import Modal from "react-bootstrap/Modal";
import { EditInput } from "./styled";
import { GenericButton } from "../Button";
import { selectCurrentRule } from "../../state/selectors/rulesSelector";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../state";
import { saveRule } from "../../state/actions/rulesAction";
import { ErrorModal } from "../ErrorModal";
import { LoadingSpinner } from "../LoadingSpinner";

type Props = {
  onHide: () => void;
  show: boolean;
  isEdit: boolean;
};

export const EditRuleModal = (props: Props) => {
  const selectedRule = useAppSelector(selectCurrentRule);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [rule, setRule] = useState(JSON.stringify(selectedRule, null, "\t"));

  const dispatch = useAppDispatch();

  const handleEditConfirm = async () => {
    setLoading(true);
    setError("");
    try {
      await dispatch(saveRule(rule));
    } catch (error) {
      setError(error as string);
    }
    setLoading(false);
    if (error !== "") props.onHide();
  };

  useEffect(() => {
    setRule(JSON.stringify(selectedRule, null, "\t"));
  }, [selectedRule]);

  return (
    <Modal show={props.show} centered onHide={props.onHide}>
      <ErrorModal
        error={error}
        show={error !== ""}
        onHide={() => setError("")}
      />
      <LoadingSpinner loading={loading} />
      <Modal.Header closeButton closeVariant="white">
        <Modal.Title>
          {props.isEdit ? <div>Edit rule</div> : <div>Add rule</div>}
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
          <EditInput rows={10} onChange={(e) => setRule(e.target.value)} />
        )}
      </Modal.Body>
      <Modal.Footer>
        <GenericButton onClick={props.onHide} text={"Cancel"} />
        <GenericButton onClick={handleEditConfirm} text={"Confirm"} />
      </Modal.Footer>
    </Modal>
  );
};
