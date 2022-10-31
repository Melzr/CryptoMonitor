import { describe, it } from "mocha";
import assert from "assert";
import { VariableManager } from "../variableManager";

describe('variableManager', function() {
    it('should be not null after initialize it', function(){
        const variableManager = VariableManager.Instance;
        assert.notDeepEqual(variableManager, null);
    });
    
    it('should be able to set a variable with a string', function(){
        const variableManager = VariableManager.Instance;
        variableManager.setVariable('String', 'TDD');
        assert.deepEqual(variableManager.getVariable('String'), 'TDD');
    });

    it('should be able to set a variable with a number', function(){
        const variableManager = VariableManager.Instance;
        variableManager.setVariable('BottomValue', 213);
        assert.deepEqual(variableManager.getVariable('BottomValue'), 213);
    });

    it('should be able to set a variable with a boolean', function(){
        const variableManager = VariableManager.Instance;
        variableManager.setVariable('buy', true);
        assert.deepEqual(variableManager.getVariable('buy'), true);
    });
})