import { Request, Response, NextFunction } from "express";
import { schemas } from "../validation/schemas";

export const validateAmount = (req: Request, res: Response, next: NextFunction) => {
    const { error } = schemas.changeAmount.validate(req['body']);

    if (error) {
        return res.status(400).json({
            error: error.message,
        });
    }

    next();
}

