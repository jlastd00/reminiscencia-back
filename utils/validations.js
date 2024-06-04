import * as Constants from '../utils/constants.js';

export const validatePassword = (value) => {
    return Constants.EXP_REG_MINUSCULAS.test(value) && 
            Constants.EXP_REG_MAYUSCULAS.test(value) && 
            Constants.EXP_REG_NUMEROS.test(value);
};


