import { useEffect, useState } from "react";
import { GenericButton } from "../../components/Button";
import { useAppDispatch, useAppSelector } from "../../state";
import {
  deleteVariable,
  getVariables,
} from "../../state/actions/variablesAction";
import { selectVariables } from "../../state/selectors/variablesSelector";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import {
  VariableContainer,
  MainContainer,
  VariableTableHeading,
  VariableTableBody,
  Line,
  VariableTitle,
  VariableText,
  VariableTableContainer,
  DeleteButton,
} from "./styled";
import { NewVariableModal } from "../../components/NewVariableModal";
import { ErrorModal } from "../../components/ErrorModal";
import { ConfirmationModal } from "../../components/ConfirmationModal";

export const Variables = () => {
  const dispatch = useAppDispatch();
  const { role } = useAppSelector(state => state.auth);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedVariable, setSelectedVariable] = useState("");

  const [showNewVariableModal, setShowNewVariableModal] = useState(false);
  useEffect(() => {
    setLoading(true);
    try {
      dispatch(getVariables());
    } catch (error) {
      setError(error as string);
    }
    setLoading(false);
  }, []);

  const deleteVariableHandler = () => {
    setLoading(true);
    try {
      dispatch(deleteVariable(selectedVariable));
    } catch (error) {
      setError(error as string);
    }
    setLoading(false);
  };

  const variables = useAppSelector(selectVariables);

  return (
    <MainContainer>
      <LoadingSpinner loading={loading} />
      <NewVariableModal
        show={showNewVariableModal}
        onHide={() => setShowNewVariableModal(false)}
      />
      <ErrorModal
        show={error !== ""}
        onHide={() => setError("")}
        error={error}
      />
      <ConfirmationModal
        show={selectedVariable !== ""}
        title={"Delete variable " + selectedVariable}
        text={"Are you sure you want to delete this variable?"}
        onHide={() => setSelectedVariable("")}
        onConfirm={deleteVariableHandler}
      />
      <VariableTableContainer>
        <VariableTableHeading>
          <VariableTitle>Variables</VariableTitle>
          {role === 'ADMIN' && (
            <GenericButton
              text="Add"
              onClick={() => setShowNewVariableModal(true)}
            />
          )}
        </VariableTableHeading>
        <Line />
        <VariableTableBody>
          {variables.map((variable) => {
            return (
              <div>
                <VariableContainer>
                  <VariableText> {variable.name} </VariableText>
                  <VariableText> {variable.value} </VariableText>
                  <VariableText>
                    {role === 'ADMIN' && (
                      <DeleteButton
                        onClick={() => setSelectedVariable(variable.name)}
                      />
                    )}
                  </VariableText>
                </VariableContainer>
                <Line />
              </div>
            );
          })}
        </VariableTableBody>
      </VariableTableContainer>
    </MainContainer>
  );
};
