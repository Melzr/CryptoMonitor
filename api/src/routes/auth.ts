import { Router } from 'express';
import AuthController from '../controllers/auth';
import { validateUser } from '../middlewares/validateUser';

const authRouter = () => {
    const router = Router();
    const authController = AuthController();
    
    router.post('/', [
        validateUser
    ], authController.login);

    router.post('/google', authController.googleLogin);

    return router;
}

export default authRouter;
