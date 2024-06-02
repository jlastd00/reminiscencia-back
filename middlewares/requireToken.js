import jwt from 'jsonwebtoken';

export const requireToken = (req, res, next) => {
    try {
        let token = req.headers?.authorization;
        if (!token) throw new Error("No Bearer");

        token = token.split(' ')[1];
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        
        const { uid } = payload;
        req.uid = uid;

        next();

    } catch (error) {
        console.log(error);

        const TokenVerifiationErrors = {
            "invalid signature": "La firma del JWT no es válida",
            "jwt expired": "El token JWT ha expirado",
            "invalid token": "El token no es válido",
            "No Bearer": "Se debe utilizar el formato Bearer",
            "jwt malformed": "El token JWT no está correctamente formado"
        }

        return res.status(403).json({ error: TokenVerifiationErrors[error.message] });
    }
};