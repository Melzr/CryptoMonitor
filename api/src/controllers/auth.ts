import { NextFunction, Request, Response } from "express";
import { generateJwt } from "../service/auth";
import { UserManager } from '../service/userManager';

const authController = () => {
    const userManager = UserManager.Instance;

    const login = async (req: Request, res: Response, next: NextFunction) => {
        const { email, password } = req.body;

        const user = userManager.getUser(email);
        if (!user || user.password !== password) {
            res.status(404).json({ error: 'Incorrect email or password' });
            return;
        }

        const token = generateJwt(user);

        res.json({ role: user.role, token });
    }

    return {
        login
    }
}

export default authController;
