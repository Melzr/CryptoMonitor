import WebSocket from "ws";
import { ApiListener } from "./apiListener";
import { RuleManager } from "./ruleManager";

export type DataRegister = {
  time: number;
  value: number;
};

export class DataManager {
  private static _instance: DataManager;
  private _data: { [key: string]: DataRegister[] } = {};
  private _apiListener: ApiListener;

  private constructor() {
    this._apiListener = new ApiListener((symbol, price, time) => {
        let ruleManager = RuleManager.Instance;
        if (!this._data[symbol]) {
            this.insertData(symbol, price, time);
            console.info("Nuevo valor para " + symbol + ": " + price);
            ruleManager.executeRules(symbol);
        } else {
            if (Math.abs(this.getLastValue(symbol)! - price) / price > 0.001) {
                this.insertData(symbol, price, time);
                console.info("Nuevo valor para " + symbol + ": " + price);
                ruleManager.executeRules(symbol);
            }
        }
    });
  }

  public startListening() {
    this._apiListener.start();
  }

  public static get Instance() {
    return this._instance || (this._instance = new this());
  }

  public insertData(name: string, value: number, time: number) {
    if (!this._data[name]) {
      this._data[name] = [];
    }
    this._data[name].push({ value, time });
  }

  public getData(symbol: string, from: number, until: number): number[] {
    let actualTime = Math.floor(new Date().getTime() / 1000);
    let data = this._data[symbol];
    if (!data) {
      return [];
    }

    return data
      .filter((item) => {
        return (
          item.time >= actualTime - from && item.time <= actualTime - until
        );
      })
      .map((item) => item.value);
  }

  public getLastValue(name: string): number | null {
    if (!this._data[name]) {
      return null;
    }
    return this._data[name][this._data[name].length - 1].value;
  }

  public suscribe(symbol: string) {
    this._apiListener.suscribe(symbol);
  }
}
