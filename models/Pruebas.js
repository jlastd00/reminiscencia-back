import { Schema, model } from "mongoose";

const pruebaSchema = new Schema({
    nombre: { type: String,  trim: true }
}, {
    versionKey: false,
});

export default model("Pruebas", pruebaSchema);
