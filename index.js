import "dotenv/config";
import "./database/connectdb.js";
import authRoutes from "./routes/auth.routes.js";
import recursoRoutes from './routes/recurso.routes.js';
import express from "express";
import cookieParser from "cookie-parser";
import cors from 'cors';

const app = express();

const whiteList = [process.env.ORIGIN1];

app.use(cors({
    origin: function (origin, callback) {
        if (whiteList.includes(origin)) {
            return callback(null, origin);
        }
        return callback("Error de CORS: " + origin + " NO AUTORIZADO!");
    }
}));

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/recursos", recursoRoutes);

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
