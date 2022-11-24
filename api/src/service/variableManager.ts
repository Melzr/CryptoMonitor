export class VariableManager {
    private static _instance: VariableManager;
    private _variables: { [key: string]: number | string | boolean } = {};

    private constructor() {}

    public static get Instance() {
        return this._instance || (this._instance = new this());
    }

    public setVariable(name: string, value: number | string | boolean ) {
        this._variables[name] = value;
        return this._variables[name];
    }

    public getVariable(name: string): number | string | boolean {
        return this._variables[name];
    }

    public getVariables() {
        return this._variables;
    }

    public deleteVariable(name: string) {
        delete this._variables[name];
    }
}