import jwt from 'jsonwebtoken';

export const generateToken = (uid) => {

    const expiresIn = 60 * 15;

    try {
        const token = jwt.sign({ uid }, process.env.JWT_SECRET, { expiresIn });
        return {
            token,
            expiresIn
        }

    } catch (error) {
        console.log(error);
    }
};

export const generateRefreshToken = (uid, res) => {

    const expiresIn = 60 * 60 * 24 * 30;

    try {
        const refreshToken = jwt.sign({ uid }, process.env.JWT_REFRESH, { expiresIn });
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: !(process.env.MODO === "developer"),
            expires: new Date(Date.now() + expiresIn * 1000)
        });

    } catch (error) {
        console.log(error);
    }
};

export const tokenVerifiationErrors = {
    "invalid signature": "La firma del JWT no es válida",
    "jwt expired": "El token JWT ha expirado",
    "invalid token": "El token no es válido",
    "No existe el token": "No existe el token",
    "jwt malformed": "El token JWT no está correctamente formado"
}

