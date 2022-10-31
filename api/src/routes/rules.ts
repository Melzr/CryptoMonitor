import { Router } from 'express';
import RulesController from '../controllers/rules';
import { validateRule } from '../middlewares/validateRule';

const rulesRouter = () => {
    const router = Router();
    const rulesController = RulesController();
    
    router.get('/', rulesController.getRules);
    
    router.post('/', [
        validateRule
    ], rulesController.addRule);

    router.delete('/:name', rulesController.deleteRule);

    return router;
}

export default rulesRouter;
