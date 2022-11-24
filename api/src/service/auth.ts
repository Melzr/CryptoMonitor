import jwt, { Secret } from 'jsonwebtoken';
import { User } from './userManager';

export const generateJwt = (user: User): string => {
    const { email, role } = user;
    const payload = {
        email,
        role,
    };
    const secret = process.env.JWT_KEY;
    return jwt.sign(payload, secret as Secret, { expiresIn: '1h' });
};

export const validateJwt = (token: string): { email: string, role: string } | null => {
    const secret = process.env.JWT_KEY;
    try {
        const { email, role } = jwt.verify(token, secret as Secret) as User;
        return { email, role };
    } catch (error) {
        return null;
    }
};
