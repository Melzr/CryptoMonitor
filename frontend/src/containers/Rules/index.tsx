import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { setSelectedRule } from "../../state/actions";
import { useDispatch } from "react-redux";
import { selectCurrentRule } from '../../state/selectors/rulesSelector';
import { AiTwotoneDelete } from "react-icons/ai";
import { HiPencil } from "react-icons/hi";
import {
  RuleButton,
  DescriptionContainer,
  ListContainer,
  MainContainer,
  OperateButton,
  Option,
  RuleText,
} from "./styled";
import { useSelector } from "react-redux";
import { Rule } from "../../interfaces/interfaces";



export const Rules = () => {
  const RULES: Rule[] = [
    {
      name: "Vender si sube 15%",
      condition: {
        type: "CALL",
        name: ">",
        arguments: [
          {
            type: "CALL",
            name: "*",
            arguments: [
              {
                type: "CONSTANT",
                value: 1.15,
              },
              {
                type: "VARIABLE",
                name: "LAST_SELL_VALUE_BTC/USDT",
              },
            ],
          },
          {
            type: "CALL",
            name: "LAST",
            arguments: [{
              type: 'DATA',
              symbol: 'BTC/USDT',
              from: 3600,
              until: 0,
              default: [{
                  type: 'CONSTANT',
                  value: 0
              }]
          }],
          },
        ],
      },
      action: [
        {
          type: "SELL_MARKET",
          symbol: "BTC/USDT",
          amount: {
            type: "CONSTANT",
            value: 0.1,
          },
        },
        {
          type: "SET_VARIABLE",
          name: "LAST_SELL_VALUE_BTC/USDT",
          value: {
            type: "CALL",
            name: "LAST",
            arguments: [{
              type: "DATA",
              symbol: "BTC/USDT",
              from: 3600,
              until: 0,
              default: [{
                type: 'CONSTANT',
                value: 0
              }]
            }],
          },
        },
      ],
    },
    {
      name: "Pagar",
      condition: {
        type: "CALL",
        name: ">",
        arguments: [
          {
            type: "CALL",
            name: "*",
            arguments: [
              {
                type: "CONSTANT",
                value: 1.15,
              },
              {
                type: "VARIABLE",
                name: "LAST_SELL_VALUE_BTC/USDT",
              },
            ],
          },
          {
            type: "CALL",
            name: "LAST",
            arguments: [{
              type: "DATA",
              symbol: "BTC/USDT",
              from: 3600,
              until: 0,
              default: [{
                type: 'CONSTANT',
                value: 0
              }],
            }],
          },
        ],
      },
      action: [
        {
          type: "SELL_MARKET",
          symbol: "BTC/USDT",
          amount: {
            type: "CONSTANT",
            value: 0.1,
          },
        },
        {
          type: "SET_VARIABLE",
          name: "LAST_SELL_VALUE_BTC/USDT",
          value: {
            type: "CALL",
            name: "LAST",
            arguments: [{
              type: "DATA",
              symbol: "BTC/USDT",
              from: 3600,
              until: 0,
              default: [{
                type: 'CONSTANT',
                value: 0
              }]
            }],
          },
        },
      ],
    },
    {
      name: "Otra regla",
      condition: {
        type: "CALL",
        name: ">",
        arguments: [
          {
            type: "CALL",
            name: "*",
            arguments: [
              {
                type: "CONSTANT",
                value: 1.15,
              },
              {
                type: "VARIABLE",
                name: "LAST_SELL_VALUE_BTC/USDT",
              },
            ],
          },
          {
            type: "CALL",
            name: "LAST",
            arguments: [{
              type: "DATA",
              symbol: "BTC/USDT",
              from: 3600,
              until: 0,
              default: [{
                type: 'CONSTANT',
                value: 0
              }]
            }],
          },
        ],
      },
      action: [
        {
          type: "SELL_MARKET",
          symbol: "BTC/USDT",
          amount: {
            type: "CONSTANT",
            value: 0.1,
          },
        },
        {
          type: "SET_VARIABLE",
          name: "LAST_SELL_VALUE_BTC/USDT",
          value: {
            type: "CALL",
            name: "LAST",
            arguments: [{
              type: "DATA",
              symbol: "BTC/USDT",
              from: 3600,
              until: 0,
              default: [{
                type: 'CONSTANT',
                value: 0
              }]
            }],
          },
        },
      ],
    },
  ];
  const dispatch = useDispatch();
  const [selected, setSelected] = useState(RULES[0]);
  const handleClick = (rule: Rule) => {
    setSelected(rule);
    dispatch(setSelectedRule(rule));
  }
  const selectedRule = useSelector(selectCurrentRule);
  return (
    <MainContainer>
      <ListContainer>
        {RULES.map((rule) => {
          return (
            <Option
              isSelected={selected.name == rule.name}
              onClick={() => handleClick(rule)}
            >
              {rule.name}
              <div>
                <RuleButton isSelected={selected.name == rule.name}>
                  <AiTwotoneDelete color="red"/> 
                </RuleButton>
                <RuleButton isSelected={selected.name == rule.name}>
                  <HiPencil color="yellow"/>
                </RuleButton>
              </div>
            </Option>
          );
        })}
      </ListContainer>
      <DescriptionContainer>
          <RuleText>
            {selectedRule ? JSON.stringify(selectedRule, null, "\n") : "No rule selected"}
          </RuleText>
      </DescriptionContainer>
    </MainContainer>
  );
};
