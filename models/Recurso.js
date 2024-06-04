import mongoose from "mongoose";

const { Schema, model } = mongoose;
const recursoSchema = new Schema({
    nombre: { type: String, trim: true, required: true },
    usuario: {
        ref: 'Usuario',
        type: Schema.Types.ObjectId
    },
    fechaInsercion: { type: Date, default: new Date() },
    url: { type: String, trim: true },
    esPublico: { type: Boolean },
    formato: { type: String, trim: true, required: true },
    tipo: { type: String, trim: true, required: true },
    fechaReferencia: { type: String },
    descripcion: { type: String, trim: true }
}, {
    versionKey: false,
});

export default model("Recurso", recursoSchema);
