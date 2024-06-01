import Usuario from "../models/Usuario.js";
import { ConstantsErrors, ConstantsExpReg } from '../utils/constants.js';

export const validatePassword = (value) => {
    return ConstantsExpReg.MINUSCULAS.test(value) && 
            ConstantsExpReg.MAYUSCULAS.test(value) && 
            ConstantsExpReg.NUMEROS.test(value);
};

export const validateUserExists = async (value) => {
    const usuario = await Usuario.findOne({ email: value });
    if (usuario) {
        throw new Error(ConstantsErrors.ERROR_USUARIO_YA_EXISTE + value);
    }
    return value;
};

export const validateUserNotExists = async (value) => {
    const usuario = await Usuario.findOne({ email: value });
    if (!usuario) {
        throw new Error(ConstantsErrors.ERROR_USUARIO_NO_EXISTE + value);
    }
    return value;
};
