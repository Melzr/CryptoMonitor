import { Request, Response, NextFunction } from "express";
import { ChangeAmountSchema } from "../validation/wallet";

export const validateAmount = (req: Request, res: Response, next: NextFunction) => {
    const { error } = ChangeAmountSchema.validate(req['body']);

    if (error) {
        return res.status(400).json({
            error: error.message,
        });
    }

    next();
}

