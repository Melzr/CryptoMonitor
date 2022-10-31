import { Router } from 'express';
import WalletController from '../controllers/wallet';
import { validateAmount } from '../middlewares/walletValidations';

const walletRouter = () => {
    const router = Router();
    const walletController = WalletController();
    
    router.get('/', walletController.getBalance);

    router.post('/sell', [
        validateAmount
    ], walletController.sellAmount);

    router.post('/buy', [
        validateAmount
    ], walletController.buyAmount);

    router.get('/value/:symbol', walletController.getValue);

    return router;
}

export default walletRouter;
