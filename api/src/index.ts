import { VariableManager } from "./variableManager";

console.log('Hello world')

const variableManager = VariableManager.Instance;
variableManager.setVariable('myVar', 'myValue');
variableManager.setVariable('myVar2', 213);
console.log(variableManager.getVariable('myVar'));
console.log(variableManager.getVariable('myVar2'));