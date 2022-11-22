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

import { RuleInfo } from "./RuleInfo";
import { deleteRule, editRule, getRules } from "../../state/actions/rulesAction";
import { useAppDispatch, useAppSelector } from "../../state";

export const Rules = () => {
  const dispatch = useAppDispatch();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const handleClick = (rule: Rule) => {
    dispatch(setSelectedRule(rule));
  };

  

  const selectedRule = useAppSelector(selectCurrentRule);
  const rules = useAppSelector(selectRules);

  useEffect(() => {
    dispatch(getRules());
    }, []);
  
  const handleDeleteConfirm = () => {
    if (selectedRule) {
      dispatch(deleteRule(selectedRule.name));
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
      />
      <ListContainer>
        <NewRuleContainer>
          <NewRuleButton>
            <NewRuleText>
              New rule
              <MdAdd color="black" size={30}/>
            </NewRuleText>
          </NewRuleButton>
        </NewRuleContainer>
        {rules.map((rule) => {
          return (
            <Option
              isSelected={selectedRule ? selectedRule.name == rule.name : false}
              onClick={() => handleClick(rule)}
            >
              {rule.name}
              <div>
                <RuleButton onClick={() => setShowDeleteModal(true)}>
                  <AiTwotoneDelete color="red" />
                </RuleButton>
                <RuleButton onClick={() => setShowEditModal(true)}>
                  <HiPencil color="yellow" />
                </RuleButton>
              </div>
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
