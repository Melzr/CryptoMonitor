import { Router } from 'express';
import RulesController from '../controllers/rules';
import { validateAdminRole } from '../middlewares/validateAdminRole';
import { validateRule } from '../middlewares/validateRule';
import { validateToken } from '../middlewares/validateToken';

const rulesRouter = () => {
    const router = Router();
    const rulesController = RulesController();
    
    router.get('/', [
        validateToken,
    ], rulesController.getRules);
    
    router.post('/', [
        validateRule,
        validateToken,
        validateAdminRole,
    ], rulesController.addRule);

    router.delete('/:name', [
        validateToken,
        validateAdminRole,
    ], rulesController.deleteRule);

    return router;
}

export default rulesRouter;
