import { describe, it } from "mocha";
import assert from "assert";
import * as wallet from "../service/wallet";
import { VariableManager } from "../service/variableManager";
import { DataManager } from "../service/dataManager";
import { RuleManager } from "../service/ruleManager";


describe("integration tests", function () {
  it("should be able to set a rule of Escape and execute it", async function () {
    let variableManager = VariableManager.Instance;
    let dataManager = DataManager.Instance;
    let ruleManager = RuleManager.Instance;

    const balance = await wallet.getBalance("BNB");
    await wallet.buyAmount("BNBUSDT", 10);
    assert.deepEqual(await wallet.getBalance("BNB"), balance + 10);

    variableManager.setVariable("LIMIT_VALUE_BNB/USDT", 10000);
    dataManager.insertData(
      "BNBUSDT",
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
                symbol: "BNB/USDT",
                from: 3600,
                until: 0,
                default: [
                  {
                    type: "VARIABLE",
                    name: "LIMIT_VALUE_BNB/USDT",
                  },
                ],
              },
            ],
          },
          {
            type: "VARIABLE",
            name: "LIMIT_VALUE_BNB/USDT",
          },
        ],
      },
      action: [
        {
          type: "SELL_MARKET",
          symbol: "BNB/USDT",
          amount: {
            type: "WALLET",
            symbol: "BNB",
          },
        },
      ],
    });
    await ruleManager.executeRules("BNBUSDT");
    assert.deepEqual(await wallet.getBalance("BNB"), 0);
  });

  it("should be able to execute a rule to always buy", async function () {
    const balance = await wallet.getBalance("BTC");
    RuleManager.Instance.setRule("Comprar 0.01 BTC/USDT siempre", {
      condition: {
        type: "CONSTANT",
        value: true,
      },
      action: [
        {
          type: "BUY_MARKET",
          symbol: "BTC/USDT",
          amount: {
            type: "CONSTANT",
            value: 0.1,
          },
        },
      ],
    });
    
    DataManager.Instance.insertData('BTCUSDT', 1, 1);
    await RuleManager.Instance.executeRules("BTCUSDT");
    assert.deepEqual(await wallet.getBalance("BTC"), balance + 0.1);
  });
});
