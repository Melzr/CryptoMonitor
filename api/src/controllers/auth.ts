import { NextFunction, Request, Response } from "express";
import { generateJwt } from "../service/auth";
import { UserManager } from '../service/userManager';
import { OAuth2Client } from 'google-auth-library';

const authController = () => {
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
    const userManager = UserManager.Instance;

    const login = async (req: Request, res: Response, next: NextFunction) => {
        const { email, password } = req.body;

        const user = userManager.getUser(email);
        if (!user || user.type !== 'EMAIL' || user.password !== password) {
            res.status(404).json({ error: 'Incorrect email or password' });
            return;
        }

        const token = generateJwt(user);

        res.json({ role: user.role, token });
    }

    const googleLogin = async (req: Request, res: Response, next: NextFunction) => {
        const token = req.header('Authorization')?.split(' ')[1];
        if (!token) {
            res.status(401).json({ error: 'No token provided' });
            return;
        }

        try {
            const ticket = await client.verifyIdToken({
                idToken: token,
                audience: process.env.GOOGLE_CLIENT_ID,
            });
            const payload = ticket.getPayload();
            if (!payload || !payload.email) {
                throw new Error('Invalid token');
            }
            const { email } = payload;
            let user = userManager.getUser(email);
            if (!user) {
                user = userManager.insertGoogleUser(email);
            }

            const jwt = generateJwt(user);

            res.json({ role: user.role, token: jwt });
        } catch (e) {
            res.status(401).json({ error: 'Invalid token' });
            return;
        }
    }

    return {
        login,
        googleLogin
    }
}

export default authController;
