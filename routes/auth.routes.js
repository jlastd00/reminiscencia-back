import express from 'express';
import { body } from 'express-validator';
import { login, logout, pruebaRutaProtegida, refreshToken, register } from '../controllers/auth.controller.js';
import { validatePassword } from '../utils/validations.js';
import * as Constants from "../utils/constants.js";
import { validationResults } from '../middlewares/validationResults.js';
import { requireToken } from '../middlewares/requireToken.js';

const router = express.Router();

router.post('/login', [
    body('email', Constants.ERROR_EMAIL_FORMATO_INCORRECTO).trim().isEmail().normalizeEmail(),
    body('password', Constants.ERROR_PASSWORD_DEMASIADO_CORTO).trim().isLength({ min: 6 }),
    body('password', Constants.ERROR_PASSWORD_FORMATO_INCORRECTO).trim()
        .custom(value => validatePassword(value))
],
validationResults,
login);

router.post('/register', [
    body('nombre', Constants.ERROR_NOMBRE_OBLIGATORIO).trim().custom(value => value.length > 0),
    body('email', Constants.ERROR_EMAIL_FORMATO_INCORRECTO).trim().isEmail().normalizeEmail(),
    body('password', Constants.ERROR_PASSWORD_DEMASIADO_CORTO).trim().isLength({ min: 6 }),
    body('password', Constants.ERROR_PASSWORD_FORMATO_INCORRECTO).trim()
        .custom(value => validatePassword(value)),
    body('role', Constants.ERROR_ROLE_OBLIGATORIO).trim().custom(value => value.length > 0)
],
validationResults,
register);

router.get('/protected', requireToken, pruebaRutaProtegida);

router.get('/refresh', refreshToken);

router.get('/logout', logout);

export default router;
