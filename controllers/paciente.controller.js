import Paciente from '../models/Paciente.js';
import Usuario from '../models/Usuario.js';
import fs from 'fs-extra';
import ActividadesLaborales from '../models/ActividadesLaborales.js';
import Pruebas from '../models/Pruebas.js';
import * as Constants from "../utils/constants.js";
import { deleteFile, uploadFotoPaciente } from '../utils/cloudinary.js';

export const getPacientes = async (req, res) => {
    try {
        const usuario = await Usuario.findById(req.uid).populate('pacientes');
        const pacientes = usuario.pacientes;
        //const pacientes = await Paciente.find(); 
        return res.status(200).json({ ok: true, pacientes });
    
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ errorMsg: Constants.ERROR_SERVER });
    }
};

export const getPaciente = async (req, res) => {
    try {
        const paciente = await Paciente.findById(req.params.id).populate('terapias');
        if (!paciente) return res.status(404).json({ errorMsg: Constants.ERROR_PACIENTE_NOT_FOUND });
        return res.status(200).json({ ok: true, paciente });

    } catch (error) {
        console.log(error.message);
        if (error.kind === "ObjectId") {
            return res.status(400).json({ errorMsg: Constants.ERROR_PARAM_ID_INCORRECTO });
        }
        return res.status(500).json({ errorMsg: Constants.ERROR_SERVER });
    }
};

export const savePaciente = async (req, res) => {
    try {
        const { datosPersonales, diagnosticosYpruebas, historiaVida, terapias } = req.body;
        const paciente = new Paciente({ datosPersonales, diagnosticosYpruebas, historiaVida, terapias });
        paciente.datosPersonales.fechaInsercion = new Date().toLocaleDateString();
        await paciente.save();
        
        const usuario = await Usuario.findById(req.uid);
        usuario.pacientes.push(paciente._id);
        await Usuario.updateOne(usuario);

        return res.status(200).json({ ok: true, msg: Constants.RESPONSE_PACIENTE_CREADO_OK });

    } catch (error) {
        console.log(error.message);    
        return res.status(500).json({ errorMsg: Constants.ERROR_SERVER });
    }
};

export const updatePaciente = async (req, res) => {
    try {
        const paciente = await Paciente.findById(req.params.id);
        if (!paciente) return res.status(404).json({ errorMsg: Constants.ERROR_PACIENTE_NOT_FOUND });
        await paciente.updateOne(req.body);

        return res.status(200).json({ ok: true, msg: Constants.RESPONSE_PACIENTE_ACTUALIZADO_OK });

    } catch (error) {
        console.log(error.message);
        if (error.kind === "ObjectId") {
            return res.status(400).json({ errorMsg: Constants.ERROR_PARAM_ID_INCORRECTO });
        }
        return res.status(500).json({ errorMsg: Constants.ERROR_SERVER });
    }
};

export const removePaciente = async (req, res) => {
    try {
        const paciente = await Paciente.findByIdAndDelete(req.params.id);
        if (!paciente) return res.status(404).json({ errorMsg: Constants.ERROR_PACIENTE_NOT_FOUND });
        
        const usuario = await Usuario.findById(req.uid);
        usuario.pacientes = usuario.pacientes.filter(id => id !== paciente._id);
        await usuario.save();

        if (paciente.foto.public_id !== "") {
            await deleteFile(paciente.foto.public_id);
        }

        return res.status(200).json({ ok: true, msg: Constants.RESPONSE_PACIENTE_ELIMINADO_OK });

    } catch (error) {
        console.log(error.message);
        if (error.kind === "ObjectId") {
            return res.status(400).json({ errorMsg: Constants.ERROR_PARAM_ID_INCORRECTO });
        }
        return res.status(500).json({ errorMsg: Constants.ERROR_SERVER });
    }
};

export const saveFotoPaciente = async (req, res) => {
    try {
        const paciente = await Paciente.findById(req.params.id);
        if (!paciente) return res.status(404).json({ errorMsg: Constants.ERROR_PACIENTE_NOT_FOUND });
        
        if (!req.files?.image) return res.status(400).json({ errorMsg: Constants.ERROR_ARCHIVO_NO_RECIBIDO });
        
        const { tempFilePath, mimetype } = req.files.image;
        
        const fileTypes = [ 'image/png', 'image/jpeg', 'image/jpg' ];
        if (!fileTypes.some((fileType) => fileType === mimetype)) {
            return res.status(400).json({ errorMsg: "Formato de imagen incorrecto [Formatos válidos: JPG, JPEG, PNG]" });
        }
        
        // Subir imagen a cloudinary 
        const uploadResult = await uploadFotoPaciente(tempFilePath);
        
        const datosFoto = {
            public_id: uploadResult.public_id,
            secure_url: uploadResult.secure_url
        }

        await paciente.updateOne({ foto: datosFoto });
        await fs.unlink(tempFilePath);

        return res.json({ ok: true, msg: "Foto de paciente guardada correctamente" });

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ errorMsg: Constants.ERROR_SERVER });
    }
};

export const getActividadesLaborales = async (req, res) => {
    try {
        const actividadesLaborales = await ActividadesLaborales.find(); 
        return res.status(200).json({ actividadesLaborales });
    
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ errorMsg: Constants.ERROR_SERVER });
    }
};

export const getPruebas = async (req, res) => {
    try {
        const pruebas = await Pruebas.find(); 
        return res.status(200).json({ pruebas });
    
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ errorMsg: Constants.ERROR_SERVER });
    }
};

