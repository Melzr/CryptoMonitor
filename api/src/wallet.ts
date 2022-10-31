export class Wallet {
    private static _instance: Wallet;
    private _balance: { [key: string]: number };

    private constructor() {
        this._balance = {};
    }

    public static get Instance(): Wallet {
        return this._instance || (this._instance = new this());
    }

    public buyAmount(symbol: string, amount: number) {
        if (amount < 0) {
            throw new Error("Amount must be positive");
        }
        if (!this._balance.hasOwnProperty(symbol)) {
            this._balance[symbol] = 0;
        }
        this._balance[symbol] += amount;
    }

    public sellAmount(symbol: string, amount: number) {
        if (amount < 0) {
            throw new Error("Amount must be positive");
        }

        if (!this._balance.hasOwnProperty(symbol)) {
            throw new Error("Wallet has no balance for symbol " + symbol);
        }

        if (amount > this._balance[symbol]) {
            throw new Error("Amount must be lower than balance");
        }

        this._balance[symbol] -= amount;
    }

    public getBalance(symbol: string): number {
        if (!this._balance.hasOwnProperty(symbol)) {
            return 0;
        }

        return this._balance[symbol];
    }

    public getTotalBalance(): { [key: string]: number } {
        return this._balance;
    }

    reset() {
        this._balance = {};
    }

}
