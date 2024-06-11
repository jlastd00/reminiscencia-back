import { Router } from 'express';
import fileUpload from 'express-fileupload';
import { requireToken } from '../middlewares/requireToken.js';
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

router.post('/', requireToken, fileUpload({
    useTempFiles: true,
    tempFileDir: './uploads'
}), 
saveRecurso);

router.put('/:id', requireToken, updateRecurso);

router.delete('/:id', requireToken, removeRecurso);

export default router;
