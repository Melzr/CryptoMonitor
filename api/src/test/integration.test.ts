import { describe, it } from "mocha";
import assert from "assert";
import { Wallet } from "../service/wallet";
import { VariableManager } from "../service/variableManager";
import { DataManager } from "../service/dataManager";
import { RuleManager } from "../service/ruleManager";


describe("integration tests", function () {
  it("should be able to set a rule of Escape and execute it", function () {
    let wallet = Wallet.Instance;
    wallet.buyAmount("AXS", 100);
    let variableManager = VariableManager.Instance;
    let dataManager = DataManager.Instance;
    let ruleManager = RuleManager.Instance;

    assert(wallet.getBalance("AXS") === 100);

    variableManager.setVariable("LIMIT_VALUE_AXS/USDT", 10000);
    dataManager.insertData(
      "AXS/USDT",
      9000,
      Math.floor(new Date().getTime() / 1000) - 1
    );

    ruleManager.setRule("Escape", {
      condition: {
        type: "CALL",
        name: "<",
        arguments: [
          {
            type: "CALL",
            name: "LAST",
            arguments: [
              {
                type: "DATA",
                symbol: "AXS/USDT",
                from: 3600,
                until: 0,
                default: [
                  {
                    type: "VARIABLE",
                    name: "LIMIT_VALUE_AXS/USDT",
                  },
                ],
              },
            ],
          },
          {
            type: "VARIABLE",
            name: "LIMIT_VALUE_AXS/USDT",
          },
        ],
      },
      action: [
        {
          type: "SELL_MARKET",
          symbol: "AXS/USDT",
          amount: {
            type: "WALLET",
            symbol: "AXS",
          },
        },
      ],
    });
    ruleManager.executeRules("AXS/USDT");
    assert.deepEqual(wallet.getBalance("AXS"), 0);
  });

  it("should be able to execute a rule to always buy", function () {
    Wallet.Instance.buyAmount("LUNC", 100);

    RuleManager.Instance.setRule("Comprar 12 LUNC/USDT siempre", {
      condition: {
        type: "CONSTANT",
        value: true,
      },
      action: [
        {
          type: "BUY_MARKET",
          symbol: "LUNC/USDT",
          amount: {
            type: "CONSTANT",
            value: 12,
          },
        },
      ],
    });

    RuleManager.Instance.executeRules("LUNC/USDT");
    assert.deepEqual(Wallet.Instance.getBalance("LUNC"), 112);
  });
});
