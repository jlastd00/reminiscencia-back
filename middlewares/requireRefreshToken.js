import jwt from "jsonwebtoken";
import { tokenVerifiationErrors } from "../utils/tokenManager.js";

export const requireRefreshToken = (req, res, next) => {
    try {
        let refreshToken = req.cookies.refreshToken;
        if (!refreshToken) throw new Error("No existe el token");

        const { uid } = jwt.verify(refreshToken, process.env.JWT_REFRESH);
        req.uid = uid;

        next();

    } catch (error) {
        console.log(error);
        return res.status(401).json({ error: tokenVerifiationErrors[error.message] });
    }
};

