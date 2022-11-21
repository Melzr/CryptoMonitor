import { buy, getAllBalance, getBalance, sell } from "./apiListener";

export class Wallet {
    private static _instance: Wallet;
    private _balance: { [key: string]: number };

    private constructor() {
        this._balance = {};
    }

    public static get Instance(): Wallet {
        return this._instance || (this._instance = new this());
    }

    public async buyAmount(symbol: string, amount: number) {
        return buy(symbol, amount);
    }

    public sellAmount(symbol: string, amount: number) {
        return sell(symbol, amount);
    }

    public getBalance(symbol: string): Promise<number> {
        return getBalance(symbol);
    }

    public async getTotalBalance(): Promise<[{ symbol: string; amount: number }]> {
        return getAllBalance();
    }

    reset() {
        this._balance = {};
    }

}
