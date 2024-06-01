import "dotenv/config";
import "./database/connectdb.js";
import authRoutes from "./routes/auth.routes.js";
import express from "express";

const app = express();

app.use(express.json());

app.use("/api/v1/auth", authRoutes);

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
