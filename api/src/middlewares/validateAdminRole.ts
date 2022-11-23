import { Response, NextFunction } from 'express';
import { RequestUser } from './validateToken';

export const validateAdminRole = (req: RequestUser, res: Response, next: NextFunction) => {
	if (!req.user || req.user.role !== 'ADMIN') {
		return res.status(403).json({
			error: 'Must have ADMIN role to perform this action'
		});
	}

    next();
}
