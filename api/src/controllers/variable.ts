import { NextFunction, Request, Response } from "express";
import { VariableManager } from "../service/variableManager";

const variableController = () => {
    const variableManager = VariableManager.Instance;

    const addVariable = async (req: Request, res: Response, next: NextFunction) => {
        const { name, value } = req.body;
        variableManager.setVariable(name, value);

        res.json({ variable: { name, value } });
    }

    const getVariables = async (req: Request, res: Response, next: NextFunction) => {
        const variables = variableManager.getVariables();
        const variablesArray = Object.entries(variables).map(([key, value]) => ({ name: key, value }));

        res.json({ variables: variablesArray });
    }

    const deleteVariable = async (req: Request, res: Response, next: NextFunction) => {
        const { name } = req.params;
        const variable = variableManager.getVariable(name);
        if (!variable) {
            res.status(404).json({ error: `Variable ${name} not found` });
            return;
        }

        variableManager.deleteVariable(name);

        res.json({ variable: { name, value: variable } });
    }

    return {
        addVariable,
        getVariables,
        deleteVariable
    }
}

export default variableController;
