import { NextFunction, Request, Response } from "express";
import { UserManager } from '../service/userManager';

const userController = () => {
    const userManager = UserManager.Instance;

    const postUser = async (req: Request, res: Response, next: NextFunction) => {
        const { email, password } = req.body;
        try {
            const user = userManager.insertUser(email, password);
            res.json({ user });
        } catch (e) {
            res.status(400).json({ error: 'Email in use' });
        }
    }

    return {
        postUser
    }
}

export default userController;
