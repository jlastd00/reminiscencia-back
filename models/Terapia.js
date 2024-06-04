import mongoose from "mongoose";

const { Schema, model } = mongoose;
const terapiaSchema = new Schema({
    nombre: { type: String,  trim: true },
    descripcion: { type: String, trim: true },
    tipo: { type: String, trim: true },
    recursos: [{
        ref: 'Recurso',
        type: Schema.Types.ObjectId
    }]
}, {
    versionKey: false,
});

export default model("Terapia", terapiaSchema);
