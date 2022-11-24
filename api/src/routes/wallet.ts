import { Router } from 'express';
import WalletController from '../controllers/wallet';
import { validateToken } from '../middlewares/validateToken';
import { validateAmount } from '../middlewares/walletValidations';
import { validateAdminRole } from '../middlewares/validateAdminRole';

const walletRouter = () => {
    const router = Router();
    const walletController = WalletController();
    
    router.get('/', [
        validateToken
    ], walletController.getBalance);

    router.post('/sell', [
        validateAmount,
        validateToken,
        validateAdminRole
    ], walletController.sellAmount);

    router.post('/buy', [
        validateAmount,
        validateToken,
        validateAdminRole
    ], walletController.buyAmount);

    router.get('/value/:symbol', [
        validateToken
    ], walletController.getValue);

    return router;
}

export default walletRouter;
