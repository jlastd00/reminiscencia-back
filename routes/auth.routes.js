import express from 'express';
import { body } from 'express-validator';
import { login, register } from '../controllers/auth.controller.js';
import { validatePassword, validateUserExists, validateUserNotExists } from '../utils/validations.js';
import { ConstantsErrors } from '../utils/constants.js';
import { validationResults } from '../middlewares/validationResults.js';

const router = express.Router();

router.post('/login', [
    body('email', ConstantsErrors.ERROR_EMAIL_FORMATO_INCORRECTO).trim().isEmail().normalizeEmail(),
    body('email').trim().normalizeEmail().custom(value => validateUserNotExists(value)),
    body('password', ConstantsErrors.ERROR_PASSWORD_DEMASIADO_CORTO).trim().isLength({ min: 6 }),
    body('password', ConstantsErrors.ERROR_PASSWORD_FORMATO_INCORRECTO).trim()
        .custom(value => validatePassword(value))
],
validationResults,
login);

router.post('/register', [
    body('nombre', ConstantsErrors.ERROR_NOMBRE_OBLIGATORIO).trim().custom(value => value.length > 0),
    body('email', ConstantsErrors.ERROR_EMAIL_FORMATO_INCORRECTO).trim().isEmail().normalizeEmail(),
    body('email').trim().normalizeEmail().custom(value => validateUserExists(value)),
    body('password', ConstantsErrors.ERROR_PASSWORD_DEMASIADO_CORTO).trim().isLength({ min: 6 }),
    body('password', ConstantsErrors.ERROR_PASSWORD_FORMATO_INCORRECTO).trim()
        .custom(value => validatePassword(value)),
    body('role', ConstantsErrors.ERROR_ROLE_OBLIGATORIO).trim().custom(value => value.length > 0)
],
validationResults,
register);

export default router;
