import { Request, Response, NextFunction } from "express";

export const validateRule = (req: Request, res: Response, next: NextFunction) => {

    if (!req['body'].rule) {
        return res.status(400).json({
            msg: "rule is required",
        });
    }

    // TODO: verify rule

    next();
}

