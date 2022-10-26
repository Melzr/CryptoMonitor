import { Router } from 'express';
import RulesController from '../controllers/rules';

const rulesRouter = () => {
    const router = Router();
    const rulesController = RulesController();
    
    router.get('/', rulesController.getRules);
    
    router.post('/', rulesController.addRule);

    router.get('/:name', rulesController.getRuleByName);

    router.delete('/:name', rulesController.deleteRule);

    return router;
}

export default rulesRouter;
