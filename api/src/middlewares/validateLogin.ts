import { Request, Response, NextFunction } from "express";
import { LoginSchema } from "../validation/user";

export const validateLogin = (req: Request, res: Response, next: NextFunction) => {
    const { error } = LoginSchema.validate(req['body']);

    if (error) {
        return res.status(400).json({
            error: error.message,
        });
    }

    next();
}

