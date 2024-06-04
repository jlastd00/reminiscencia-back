import { Router } from 'express';
import { requireToken } from '../middlewares/requireToken.js';
import { validateBodyRecurso } from '../middlewares/validationManager.js';
import { 
    getRecurso, 
    getRecursos, 
    removeRecurso, 
    saveRecurso, 
    updateRecurso 
} from '../controllers/recurso.controller.js';

const router = Router();

router.get('/', requireToken, getRecursos);

router.get('/:id', requireToken, getRecurso);

router.post('/', [requireToken, validateBodyRecurso], saveRecurso);

router.put('/:id', requireToken, updateRecurso);

router.delete('/:id', requireToken, removeRecurso);

export default router;
