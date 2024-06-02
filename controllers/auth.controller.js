import Usuario from "../models/Usuario.js";
import * as Constants from "../utils/constants.js";
import { generateRefreshToken, generateToken } from "../utils/tokenManager.js";
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
    
    const { nombre, email, password, role, pacientes } = req.body;
    
    try {
        const usuario = new Usuario({
            nombre,
            email,
            password,
            role,
            pacientes: pacientes ? pacientes : []
        });

        await usuario.save();

        return res.status(201).json({ msg: Constants.RESPONSE_USUARIO_GUARDADO_OK });

    } catch (error) {
        console.log(error);
        if (error.code === 11000) {
            return res.status(400).json({ error: Constants.ERROR_USUARIO_YA_EXISTE });
        }
        return res.status(500).json({ error: Constants.ERROR_SERVER });
    }
};

export const login = async (req, res) => {

    const { email, password } = req.body;
    
    try {
        const usuario = await Usuario.findOne({ email });
        if (!usuario) {
            return res.status(401).json({ error: Constants.ERROR_USUARIO_NO_EXISTE });
        }

        const matchPassword = await usuario.comparePassword(password);
        if (!matchPassword) return res.status(401).json({ error: Constants.ERROR_PASSWORD_INCORRECTO });
        
        const { token, expiresIn } = generateToken(usuario._id);
        generateRefreshToken(usuario._id, res);

        return res.status(200).json({ msg: Constants.RESPONSE_LOGIN_OK, token, expiresIn });

    } catch (error) {
        console.log(error);
        if (error.code === 11000) {
            return res.status(400).json({ error: error.message });
        }
        return res.status(500).json({ error: Constants.ERROR_SERVER });
    }
};

export const refreshToken = (req, res) => {

    try {
        let refreshToken = req.cookies.refreshToken;
        if (!refreshToken) throw new Error("No existe el token");

        const { uid } = jwt.verify(refreshToken, process.env.JWT_REFRESH);
        const { token, expiresIn } = generateToken(uid);

        return res.status(200).json({ token, expiresIn });

    } catch (error) {
        console.log(error);

        const TokenVerifiationErrors = {
            "invalid signature": "La firma del JWT no es válida",
            "jwt expired": "El token JWT ha expirado",
            "invalid token": "El token no es válido",
            "No existe el token": "No existe el token",
            "jwt malformed": "El token JWT no está correctamente formado"
        }

        return res.status(403).json({ error: TokenVerifiationErrors[error.message] });
    }

};

export const logout = (req, res) => {
    res.clearCookie("refreshToken");
    res.json({ msg: "Se ha cerrado la sesión" });
};

export const pruebaRutaProtegida = async (req, res) => {
    try {
        const usuario = await Usuario.findById(req.uid).lean();
        res.json({ msg: "Información protegida", usuario });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: Constants.ERROR_SERVER });
    }
    
};
