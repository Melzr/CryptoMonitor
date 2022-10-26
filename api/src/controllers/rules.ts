import { NextFunction, Request, Response } from "express";

const rulesController = () => {
    const addRule = async (req: Request, res: Response, next: NextFunction) => {
        // TODO
        return res.json({ msg: "add rule" });
    }

    const getRuleByName = async (req: Request, res: Response, next: NextFunction) => {
        // TODO
        return res.json({ msg: "get rule by name" });
    }

    const getRules = async (req: Request, res: Response, next: NextFunction) => {
        console.log('get rules');
        // TODO
        return res.json({ msg: "get rules" });
    }

    const putRule = async (req: Request, res: Response, next: NextFunction) => {
        // TODO
        return res.json({ msg: "put rule" });
    }

    const deleteRule = async (req: Request, res: Response, next: NextFunction) => {
        // TODO
        return res.json({ msg: "delete rule" });
    }

    return {
        addRule,
        getRuleByName,
        getRules,
        putRule,
        deleteRule
    }
}

export default rulesController;
