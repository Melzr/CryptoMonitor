import { Router } from 'express';
import VariableController from '../controllers/variable';
import { validateAdminRole } from '../middlewares/validateAdminRole';
import { validateVariable } from '../middlewares/validateVariable';
import { validateToken } from '../middlewares/validateToken';

const variableController = () => {
    const router = Router();
    const variableController = VariableController();
    
    router.get('/', [
        validateToken,
    ], variableController.getVariables);
    
    router.post('/', [
        validateToken,
        validateAdminRole,
        validateVariable,
    ], variableController.addVariable);

    router.delete('/:name', [
        validateToken,
        validateAdminRole,
    ], variableController.deleteVariable);

    return router;
}

export default variableController;
