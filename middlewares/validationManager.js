import { body, validationResult } from "express-validator";
import { validatePassword } from "../utils/validations.js";
import * as Constants from "../utils/constants.js";

export const validationResults = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

export const validateBodyRegister = [
    body('nombre', Constants.ERROR_NOMBRE_OBLIGATORIO).trim().custom(value => value.length > 0),
    body('email', Constants.ERROR_EMAIL_FORMATO_INCORRECTO).trim().isEmail().normalizeEmail(),
    body('password', Constants.ERROR_PASSWORD_DEMASIADO_CORTO).trim().isLength({ min: 6 }),
    body('password', Constants.ERROR_PASSWORD_FORMATO_INCORRECTO).trim()
        .custom(value => validatePassword(value)),
    body('role', Constants.ERROR_ROLE_OBLIGATORIO).trim().custom(value => value.length > 0),
    
    validationResults
];

export const validateBodyLogin = [
    body('email', Constants.ERROR_EMAIL_FORMATO_INCORRECTO).trim().isEmail().normalizeEmail(),
    body('password', Constants.ERROR_PASSWORD_DEMASIADO_CORTO).trim().isLength({ min: 6 }),
    body('password', Constants.ERROR_PASSWORD_FORMATO_INCORRECTO).trim()
        .custom(value => validatePassword(value)),
    
    validationResults
];

export const validateBodyRecurso = [
    body('nombre', Constants.ERROR_NOMBRE_RECURSO_OBLIGATORIO).trim().custom(value => value.length > 0),
    body('formato', Constants.ERROR_FORMATO_RECURSO_OBLIGATORIO).trim().custom(value => value.length > 0),
    body('tipo', Constants.ERROR_TIPO_RECURSO_OBLIGATORIO).trim().custom(value => value.length > 0),

    validationResults
];

