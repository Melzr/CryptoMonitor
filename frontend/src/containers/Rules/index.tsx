import React, { useState } from "react";
import { Button } from "react-bootstrap";
import {
  DeleteButton,
  DescriptionContainer,
  ListContainer,
  MainContainer,
  OperateButton,
  Option,
} from "./styled";

export const Rules = () => {
  const RULES = [
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
            arguments: {
              type: "DATA",
              symbol: "BTC/USDT",
              from: 3600,
              until: 0,
            },
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
            arguments: {
              type: "DATA",
              symbol: "BTC/USDT",
              from: 3600,
              until: 0,
            },
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
            arguments: {
              type: "DATA",
              symbol: "BTC/USDT",
              from: 3600,
              until: 0,
            },
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
            arguments: {
              type: "DATA",
              symbol: "BTC/USDT",
              from: 3600,
              until: 0,
            },
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
            arguments: {
              type: "DATA",
              symbol: "BTC/USDT",
              from: 3600,
              until: 0,
            },
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
            arguments: {
              type: "DATA",
              symbol: "BTC/USDT",
              from: 3600,
              until: 0,
            },
          },
        },
      ],
    },
  ];

  const [selected, setSelected] = useState(RULES[0]);

  return (
    <MainContainer>
      <ListContainer>
        {RULES.map((rule) => {
          return (
            <Option
              isSelected={selected.name == rule.name}
              onClick={() => setSelected(rule)}
            >
              {rule.name}
              <div>
                <OperateButton isDelete = {true}>
                  Delete
                </OperateButton>
                <OperateButton isDelete = {false}>
                  Modify
                </OperateButton>
              </div>
            </Option>
          );
        })}
      </ListContainer>
      <DescriptionContainer>
          
      </DescriptionContainer>
    </MainContainer>
  );
};
