import mongoose from "mongoose";

const { Schema, model } = mongoose;
const pacienteSchema = new Schema({
    foto: { 
        path: { type: String, default: "" }, 
        filename: { type: String, default: "" } 
    },
    datosPersonales: {
        fechaNac: { type: Date },
        nombre: { type: String,  trim: true },
        apellido1: { type: String, trim: true },
        apellido2: { type: String, trim: true },
        fechaInsercion: { type: Date, default: new Date(), },
        institucionalizado: { type: Boolean },
        institucion: {
            nombre: { type: String, trim: true },
            localidad: { type: String, trim: true },
            fechaIngreso: { type: Date }
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
            fechaDiagnostico: { type: Date }
        }],
        pruebas: [{
            prueba: { type: String, trim: true },
            fechaPrueba: { type: Date }
        }]
    },
    historiaVida: {
        lugarNac: { type: String, trim: true },
        lugaresResidencia: [{
            fechaInicio: { type: Date },
            fechaFin: { type: Date },
            localidad: { type: String, trim: true },
            provincia: { type: String, trim: true },
            pais: { type: String, trim: true }
        }],
        nivelEstudios: { type: String, trim: true },
        estudios: {
            institucion: { type: String, trim: true },
            localidad: { type: String, trim: true },
            titulacion: { type: String, trim: true },
            fechaInicio: { type: Date },
            fechaFin: { type: Date }
        },
        actividadesLaborales: [{
            actividad: { type: String, trim: true },
            empresa: { type: String, trim: true },
            localidad: { type: String, trim: true },
            provincia: { type: String, trim: true },
            pais: { type: String, trim: true },
            fechaInicio: { type: Date },
            fechaFin: { type: Date }
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
