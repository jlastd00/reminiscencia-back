import mongoose from "mongoose";

const { Schema, model } = mongoose;
const pacienteSchema = new Schema({
    foto: { 
        public_id: { type: String, default: "" }, 
        secure_url: { type: String, default: "" }
    },
    datosPersonales: {
        fechaNac: { type: String },
        nombre: { type: String,  trim: true },
        apellido1: { type: String, trim: true },
        apellido2: { type: String, trim: true },
        fechaInsercion: { type: String, default: new Date().toString(), },
        institucionalizado: { type: Boolean },
        institucion: {
            nombre: { type: String, trim: true },
            localidad: { type: String, trim: true },
            fechaIngreso: { type: String }
        },
        direccion: {
            nombre: { type: String, trim: true },
            numero: { type: String, trim: true },
            pisoYletra: { type: String, trim: true },
            localidad: { type: String, trim: true },
            provincia: { type: String, trim: true }
        }
    },
    diagnosticosYpruebas: {
        diagnosticos: [{
            diagnostico: { type: String, trim: true },
            profesional: { type: String, trim: true },
            fechaDiagnostico: { type: String }
        }],
        pruebas: [{
            prueba: { type: String, trim: true },
            fechaPrueba: { type: String }
        }]
    },
    historiaVida: {
        lugarNac: { type: String, trim: true },
        lugaresResidencia: [{
            fechaInicio: { type: String },
            fechaFin: { type: String },
            localidad: { type: String, trim: true },
            provincia: { type: String, trim: true },
            pais: { type: String, trim: true }
        }],
        nivelEstudios: { type: String, trim: true },
        estudios: {
            institucion: { type: String, trim: true },
            localidad: { type: String, trim: true },
            titulacion: { type: String, trim: true },
            fechaInicio: { type: String },
            fechaFin: { type: String }
        },
        actividadesLaborales: [{
            actividad: { type: String, trim: true },
            empresa: { type: String, trim: true },
            localidad: { type: String, trim: true },
            provincia: { type: String, trim: true },
            pais: { type: String, trim: true },
            fechaInicio: { type: String },
            fechaFin: { type: String }
        }],
        aficiones: []
    },
    terapias: [{
        ref: 'Terapia',
        type: Schema.Types.ObjectId
    }],
}, {
    versionKey: false,
});

export default model("Paciente", pacienteSchema);
