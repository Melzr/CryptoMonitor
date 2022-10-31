import { Request, Response, NextFunction } from "express";
import { schemas } from "../validation/schemas";

export const validateRule = (req: Request, res: Response, next: NextFunction) => {
    const { rule } = req['body'];

    if (!rule) {
        return res.status(400).json({
            msg: "rule is required",
        });
    }

    const { error } = schemas.rule.validate(rule);

    if (error) {
        return res.status(400).json({
            error: error.message,
        });
    }

    next();
}

