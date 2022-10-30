import { Router } from 'express';
import WalletController from '../controllers/wallet';
import { body } from 'express-validator';
import { validateRule } from '../middlewares/validateRule';
import { validateFields } from '../middlewares/validateFields';

const walletRouter = () => {
    const router = Router();
    const walletController = WalletController();
    
    router.get('/', walletController.getBalance);

    router.delete('/:symbol', walletController.getValue);

    return router;
}

export default walletRouter;
