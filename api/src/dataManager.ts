export type DataRegister = {
    time: number;
    value: number;
};

export class DataManager {
    private static _instance: DataManager;
    private _data: { [key: string]: DataRegister[] } = {};

    private constructor() {}

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
        return data.filter((item) => {
            (item.time >= actualTime - from && item.time <= actualTime - until);
        }).map((item) => item.value);
    }

    public getLastValue(name: string): DataRegister | null {
        if (!this._data[name]) {
            return null;
        }
        return this._data[name][this._data[name].length - 1];
    }
}