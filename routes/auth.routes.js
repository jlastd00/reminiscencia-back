import express from 'express';
import { login, logout, pruebaRutaProtegida, refreshToken, register } from '../controllers/auth.controller.js';
import { validateBodyLogin, validateBodyRegister } from '../middlewares/validationManager.js';
import { requireToken } from '../middlewares/requireToken.js';
import { requireRefreshToken } from '../middlewares/requireRefreshToken.js';

const router = express.Router();

router.post('/login', validateBodyLogin, login);

router.post('/register', validateBodyRegister, register);

router.get('/protected', requireToken, pruebaRutaProtegida);

router.get('/refresh', requireRefreshToken, refreshToken);

router.get('/logout', logout);

export default router;
