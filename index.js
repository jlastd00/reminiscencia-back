import express from "express";
import cookieParser from "cookie-parser";
import cors from 'cors';
import "dotenv/config";
import "./database/connectdb.js";
import authRoutes from "./routes/auth.routes.js";
import recursoRoutes from './routes/recurso.routes.js';
import pacienteRoutes from './routes/paciente.routes.js';
import terapiaRoutes from './routes/terapia.routes.js';

const app = express();

const whiteList = [process.env.ORIGIN1, process.env.ORIGIN2];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || whiteList.includes(origin)) {
            return callback(null, origin);
        }
        return callback("Error de CORS: " + origin + " NO AUTORIZADO!");
    },
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/recursos", recursoRoutes);
app.use("/api/v1/pacientes", pacienteRoutes);
app.use("/api/v1/terapias", terapiaRoutes);

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
