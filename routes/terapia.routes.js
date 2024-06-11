import { Router } from 'express';
import { requireToken } from '../middlewares/requireToken.js';
import { 
    getTerapia, 
    getTerapias, 
    removeTerapia, 
    saveTerapia, 
    updateTerapia 
} from '../controllers/terapia.controller.js';

const router = Router();

router.get('/', requireToken, getTerapias);

router.get('/:id', requireToken, getTerapia);

router.post('/', requireToken, saveTerapia);

router.put('/:id', requireToken, updateTerapia);

router.delete('/:id', requireToken, removeTerapia);

export default router;
