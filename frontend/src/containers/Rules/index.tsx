import React, { useState } from "react";
import { setSelectedRule } from "../../state/actions";
import { useDispatch } from "react-redux";
import { selectCurrentRule } from "../../state/selectors/rulesSelector";
import { AiTwotoneDelete } from "react-icons/ai";
import { HiPencil } from "react-icons/hi";
import {
  RuleButton,
  DescriptionContainer,
  ListContainer,
  MainContainer,
  Option,
} from "./styled";
import { useSelector } from "react-redux";
import { Rule } from "../../interfaces/interfaces";
import { RULES } from "./constants";
import { ConfirmationModal } from "../../components/ConfirmationModal";
import { EditRuleModal } from "../../components/EditModal";

import { RuleInfo } from "./RuleInfo";

export const Rules = () => {
  const dispatch = useDispatch();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const handleClick = (rule: Rule) => {
    dispatch(setSelectedRule(rule));
  };

  const selectedRule = useSelector(selectCurrentRule);

  return (
    <MainContainer>
      <ConfirmationModal
        onConfirm={() => console.log("aa")}
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
        {RULES.map((rule) => {
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
