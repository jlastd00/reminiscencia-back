import jwt from 'jsonwebtoken';
import { tokenVerifiationErrors } from '../utils/tokenManager.js';

export const requireToken = (req, res, next) => {
    try {
        let token = req.headers?.authorization;
        if (!token) throw new Error("No existe el token");

        token = token.split(' ')[1];
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        
        const { uid } = payload;
        req.uid = uid;

        next();

    } catch (error) {
        console.log(error);
        return res.status(401).json({ error: tokenVerifiationErrors[error.message] });
    }
};

