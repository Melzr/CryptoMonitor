export class VariableManager {
    private static _instance: VariableManager;
    private _variables: { [key: string]: number | string | boolean } = {};

    private constructor() {}

    public static get Instance() {
        return this._instance || (this._instance = new this());
    }

    public setVariable(name: string, value: number | string | boolean ) {
        this._variables[name] = value;
    }

    public getVariable(name: string) {
        return this._variables[name];
    }
}