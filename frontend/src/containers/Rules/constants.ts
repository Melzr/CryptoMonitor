import { Rule } from "../../interfaces/interfaces";

export const RULES: Rule[] = [
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
          arguments: [
            {
              type: "DATA",
              symbol: "BTC/USDT",
              from: 3600,
              until: 0,
              default: [
                {
                  type: "CONSTANT",
                  value: 0,
                },
              ],
            },
          ],
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
          arguments: [
            {
              type: "DATA",
              symbol: "BTC/USDT",
              from: 3600,
              until: 0,
              default: [
                {
                  type: "CONSTANT",
                  value: 0,
                },
              ],
            },
          ],
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
          arguments: [
            {
              type: "DATA",
              symbol: "BTC/USDT",
              from: 3600,
              until: 0,
              default: [
                {
                  type: "CONSTANT",
                  value: 0,
                },
              ],
            },
          ],
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
          arguments: [
            {
              type: "DATA",
              symbol: "BTC/USDT",
              from: 3600,
              until: 0,
              default: [
                {
                  type: "CONSTANT",
                  value: 0,
                },
              ],
            },
          ],
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
          arguments: [
            {
              type: "DATA",
              symbol: "BTC/USDT",
              from: 3600,
              until: 0,
              default: [
                {
                  type: "CONSTANT",
                  value: 0,
                },
              ],
            },
          ],
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
          arguments: [
            {
              type: "DATA",
              symbol: "BTC/USDT",
              from: 3600,
              until: 0,
              default: [
                {
                  type: "CONSTANT",
                  value: 0,
                },
              ],
            },
          ],
        },
      },
    ],
  },
];

