import { Router } from 'express';
import UserController from '../controllers/user';
import { validateUser } from '../middlewares/validateUser';

const userRouter = () => {
    const router = Router();
    const userController = UserController();
    
    router.post('/', [
        validateUser
    ], userController.postUser);

    return router;
}

export default userRouter;
