import { Request, Response, NextFunction } from "express";
import { RuleSchema } from "../schemas/rule";

export const validateRule = (req: Request, res: Response, next: NextFunction) => {
    const { rule } = req['body'];

    if (!rule) {
        return res.status(400).json({
            error: "rule is required",
        });
    }

    const { error } = RuleSchema.validate(rule);

    if (error) {
        return res.status(400).json({
            error: error.message,
        });
    }

    next();
}

