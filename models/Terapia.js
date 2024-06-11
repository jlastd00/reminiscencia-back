import mongoose from "mongoose";

const { Schema, model } = mongoose;
const terapiaSchema = new Schema({
    nombre: { type: String,  trim: true, required: true },
    descripcion: { type: String, trim: true, required: true },
    tipo: { type: String, trim: true, required: true },
    recursos: [{
        ref: 'Recurso',
        type: Schema.Types.ObjectId
    }]
}, {
    versionKey: false,
});

export default model("Terapia", terapiaSchema);
