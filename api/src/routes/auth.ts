import { Router } from 'express';
import AuthController from '../controllers/auth';
import { validateUser } from '../middlewares/validateUser';

const authRouter = () => {
    const router = Router();
    const authController = AuthController();
    
    router.post('/', [
        validateUser
    ], authController.login);

    return router;
}

export default authRouter;
