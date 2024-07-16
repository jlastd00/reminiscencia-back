import Terapia from "../models/Terapia.js";
import Paciente from "../models/Paciente.js";
import * as Constants from "../utils/constants.js";

export const getTerapias = async(req, res) => {
    try {
        const terapias = await Terapia.find().populate('recursos'); 
        return res.status(200).json({ ok: true, terapias });
    
    } catch (error) {
        console.log(error.message); 
        return res.status(500).json({ errorMsg: Constants.ERROR_SERVER });
    }
};

export const getTerapia = async(req, res) => {
    try {
        const terapia = await Terapia.findById(req.params.id).populate('recursos');
        if (!terapia) return res.status(404).json({ errorMsg: Constants.ERROR_TERAPIA_NOT_FOUND });

        return res.status(200).json({ ok: true, terapia });

    } catch (error) {
        console.log(error.message); 
        if (error.kind === "ObjectId") {
            return res.status(400).json({ errorMsg: Constants.ERROR_PARAM_ID_INCORRECTO });
        }
        return res.status(500).json({ errorMsg: Constants.ERROR_SERVER });
    } 
};

export const saveTerapia = async(req, res) => {
    try {
        const { nombre, descripcion, tipo, recursos } = req.body;
        const terapia = new Terapia({ nombre, descripcion, tipo, recursos });

        await terapia.save();

        return res.status(200).json({ ok: true, msg: Constants.RESPONSE_TERAPIA_CREADA_OK });

    } catch (error) {   
        console.log(error.message);    
        return res.status(500).json({ errorMsg: Constants.ERROR_SERVER });
    }
};

export const updateTerapia = async(req, res) => {
    try {
        const terapia = await Terapia.findByIdAndUpdate(req.params.id, req.body);
        if (!terapia) return res.status(404).json({ errorMsg: Constants.ERROR_TERAPIA_NOT_FOUND });

        return res.status(200).json({ ok: true, msg: Constants.RESPONSE_TERAPIA_ACTUALIZADA_OK });

    } catch (error) {
        console.log(error.message); 
        if (error.kind === "ObjectId") {
            return res.status(400).json({ errorMsg: Constants.ERROR_PARAM_ID_INCORRECTO });
        }
        return res.status(500).json({ errorMsg: Constants.ERROR_SERVER });
    }
};

export const removeTerapia = async(req, res) => {
    try {
        const terapia = await Terapia.findByIdAndDelete(req.params.id);
        if (!terapia) return res.status(404).json({ errorMsg: Constants.ERROR_TERAPIA_NOT_FOUND });

        const pacientes = await Paciente.find();
        let terapiasList = [];
        for (const paciente of pacientes) {
            paciente.terapias.forEach(t => {
                if (t._id !== terapia._id) {
                    terapiasList.push(t);
                }
            });
            paciente.terapias = terapiasList;
            await Paciente.updateOne(paciente);
        }
        
        return res.status(200).json({ ok: true, msg: Constants.RESPONSE_TERAPIA_ELIMINADA_OK });

    } catch (error) {
        console.log(error.message); 
        if (error.kind === "ObjectId") {
            return res.status(400).json({ errorMsg: Constants.ERROR_PARAM_ID_INCORRECTO });
        }
        return res.status(500).json({ errorMsg: Constants.ERROR_SERVER });
    }
};
