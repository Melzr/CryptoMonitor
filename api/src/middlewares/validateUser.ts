import { Request, Response, NextFunction } from "express";
import { PostUserSchema } from "../validation/user";

export const validateUser = (req: Request, res: Response, next: NextFunction) => {
    const { error } = PostUserSchema.validate(req['body']);

    if (error) {
        return res.status(400).json({
            error: error.message,
        });
    }

    next();
}

