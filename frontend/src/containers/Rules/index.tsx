import React, { useEffect, useState } from "react";
import {  setSelectedRule } from "../../state/actions";

import { selectCurrentRule, selectRules } from "../../state/selectors/rulesSelector";
import { AiTwotoneDelete } from "react-icons/ai";
import { HiPencil } from "react-icons/hi";
import { MdAdd } from "react-icons/md";
import {
  RuleButton,
  DescriptionContainer,
  ListContainer,
  MainContainer,
  Option,
  NewRuleContainer,
  NewRuleText,
  NewRuleButton,
} from "./styled";
import { useSelector } from "react-redux";
import { Rule } from "../../interfaces/interfaces";
import { RULES } from "./constants";
import { ConfirmationModal } from "../../components/ConfirmationModal";
import { EditRuleModal } from "../../components/EditModal";
import { useAppDispatch, useAppSelector } from "../../state";
import { LoadingSpinner } from "../../components/LoadingSpinner";

import { RuleInfo } from "./RuleInfo";
import { deleteRule, saveRule, getRules } from "../../state/actions/rulesAction";

export const Rules = () => {
  const dispatch = useAppDispatch();
  const { role } = useAppSelector(state => state.auth);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showNewRuleModal, setShowNewRuleModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleClick = (rule: Rule) => {
    dispatch(setSelectedRule(rule));
  };

  let selectedRule = useAppSelector(selectCurrentRule);
  const rules = useAppSelector(selectRules);

  useEffect(() => {
    setLoading(true);
    try {
      dispatch(getRules());
    } catch (error) {
      setError(error as string);
    }
    setLoading(false);
  }, []);
  
  const handleDeleteConfirm = () => {
    if (selectedRule) {
      setLoading(true);
      try {
        dispatch(deleteRule(selectedRule.name)); 
      } catch (error) {
        setError(error as string);
      }
      setLoading(false);
    }
  }


  return (
    <MainContainer>
      <ConfirmationModal
        onConfirm={() => handleDeleteConfirm()}
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        title={"Delete rule"}
        text={"Are you sure you want to delete this rule?"}
      />
      <EditRuleModal
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        isEdit={true}
      />
      <EditRuleModal
        show={showNewRuleModal}
        onHide={() => setShowNewRuleModal(false)}
        isEdit={false}
      />
      <LoadingSpinner loading={loading} />
      <ListContainer>
        {role === "ADMIN" && (
          <NewRuleContainer>
            <NewRuleButton onClick={() => setShowNewRuleModal(true)}>
              <NewRuleText>
                New rule
                <MdAdd color="black" size={30}/>
              </NewRuleText>
            </NewRuleButton>
          </NewRuleContainer>
        )}
        {rules.map((rule) => {
          return (
            <Option
              isSelected={selectedRule ? selectedRule.name == rule.name : false}
              onClick={() => handleClick(rule)}
            >
              {rule.name}
              {role === "ADMIN" && (
                <div>
                  <RuleButton onClick={() => setShowDeleteModal(true)}>
                    <AiTwotoneDelete color="red" />
                  </RuleButton>
                  <RuleButton onClick={() => setShowEditModal(true)}>
                    <HiPencil color="yellow" />
                  </RuleButton>
                </div>
              )}
            </Option>
          );
        })}
      </ListContainer>
      <DescriptionContainer>
        {selectedRule ? (
          <RuleInfo rule={selectedRule} />
        ) : (
          <div>No rule selected</div>
        )}
      </DescriptionContainer>
    </MainContainer>
  );
};
