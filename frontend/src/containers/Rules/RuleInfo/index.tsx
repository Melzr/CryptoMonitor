import { Rule } from "../../../interfaces/interfaces";
import {
  ActionContainer,
  ConditionContainer,
  Header,
  Line,
  RuleContainer,
  RuleSubtitle,
  RuleTitle,
  Container,
} from "./styled";
import { showAction, showValue } from "./utils";

interface Props {
  rule: Rule;
}

export const RuleInfo = (props: Props) => {
  const { rule } = props;

  return (
    <Container>
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
          <RuleSubtitle>Action</RuleSubtitle>
          {showAction(rule.action, 0)}
        </ActionContainer>
      </RuleContainer>
    </Container>
  );
};
