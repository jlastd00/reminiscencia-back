import { Schema, model } from "mongoose";

const actividadLaboralSchema = new Schema({
    nombre: { type: String,  trim: true }
}, {
    versionKey: false,
});

export default model("ActividadesLaborales", actividadLaboralSchema);
