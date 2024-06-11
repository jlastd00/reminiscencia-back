import { Router } from 'express';
import fileUpload from 'express-fileupload';
import { 
    getActividadesLaborales,
    getPaciente, 
    getPacientes, 
    getPruebas, 
    removePaciente, 
    saveFotoPaciente, 
    savePaciente, 
    updatePaciente 
} from '../controllers/paciente.controller.js';
import { requireToken } from '../middlewares/requireToken.js';

const router = Router();

router.get('/', requireToken, getPacientes);

router.get('/:id', requireToken, getPaciente);

router.post('/', requireToken, savePaciente);

router.put('/:id', requireToken, updatePaciente); 

router.delete('/:id', requireToken, removePaciente);

router.post('/foto/:id', requireToken, fileUpload({
    useTempFiles: true,
    tempFileDir: './uploads'
}),
saveFotoPaciente);

router.get('/actividadesLaborales/list', requireToken, getActividadesLaborales);

router.get('/pruebas/list', requireToken, getPruebas);

export default router;
