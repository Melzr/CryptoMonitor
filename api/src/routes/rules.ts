import { Router } from 'express';
import RulesController from '../controllers/rules';
import { body } from 'express-validator';
import { validateRule } from '../middlewares/validateRule';
import { validateFields } from '../middlewares/validateFields';

const rulesRouter = () => {
    const router = Router();
    const rulesController = RulesController();
    
    router.get('/', rulesController.getRules);
    
    router.post('/', [
        body('rule').custom(validateRule),
        validateFields
    ], rulesController.addRule);

    router.delete('/:name', rulesController.deleteRule);

    return router;
}

export default rulesRouter;
