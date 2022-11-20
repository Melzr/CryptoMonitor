import { Rule, ValueType } from "../../../interfaces/interfaces";
import {
  ActionContainer,
  ConditionContainer,
  Header,
  Line,
  RuleContainer,
  RuleSubtitle,
  RuleTitle,
  ValueBox,
} from "./styled";
import { showValue } from "./utils";

interface Props {
  rule: Rule;
}

export const RuleInfo = (props: Props) => {
  const { rule } = props;

  return (
    <div>
      <Header>
        <RuleTitle>{rule.name}</RuleTitle>
      </Header>
      <Line />
      <RuleContainer>
        <ConditionContainer>
          <RuleSubtitle>Condition</RuleSubtitle>
          {showValue(rule.condition, 0)}
        </ConditionContainer>
        <ActionContainer>
          <RuleSubtitle>Condition</RuleSubtitle>
          {showValue(rule.condition, 0)}
        </ActionContainer>
      </RuleContainer>
    </div>
  );
};
