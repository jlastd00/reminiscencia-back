import mongoose from "mongoose";

const { Schema, model } = mongoose;
const recursoSchema = new Schema({
    publicId: { type: String, required: true },
    url: { type: String, required: true },
    nombre: { type: String, trim: true, required: true },
    usuario: {
        ref: 'Usuario',
        type: Schema.Types.ObjectId
    },
    fechaInsercion: { type: Date, default: new Date() },
    esPublico: { type: Boolean },
    formato: { type: String, required: true },
    tipo: { type: String, required: true },
    fechaReferencia: { type: String },
    descripcion: { type: String, trim: true }
}, {
    versionKey: false,
});

export default model("Recurso", recursoSchema);
