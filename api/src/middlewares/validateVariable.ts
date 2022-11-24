import { Request, Response, NextFunction } from "express";
import { VariableSchema } from "../schemas/variable";

export const validateVariable = (req: Request, res: Response, next: NextFunction) => {
    const { error } = VariableSchema.validate(req['body']);

    if (error) {
        return res.status(400).json({
            error: error.message,
        });
    }

    next();
}

