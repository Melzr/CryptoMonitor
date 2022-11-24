import { Request, Response, NextFunction } from 'express';
import { validateJwt } from '../service/auth';
import { UserManager, User } from '../service/userManager';

export interface RequestUser extends Request {
    user?: User;
}

export const validateToken = (req: RequestUser, res: Response, next: NextFunction) => {
    const userManager = UserManager.Instance;
    const token = req.header('Authorization')?.split(' ')[1];

    if ( !token ) {
        return res.status(401).json({
            error: 'No token provided'
        });
    }

    const data = validateJwt(token);
    if (!data) {
        return res.status(401).json({
            error: 'Invalid token'
        });
    }

    const user = userManager.getUser(data.email);
    if (!user) {
        return res.status(401).json({
            error: 'Invalid token'
        });
    }

    req.user = user;
    next();
}
