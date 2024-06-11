import Terapia from "../models/Terapia.js";
import * as Constants from "../utils/constants.js";

export const getTerapias = async(req, res) => {
    try {
        const terapias = await Terapia.find(); 
        return res.status(200).json({ terapias });
    
    } catch (error) {
        console.log(error.message); 
        return res.status(500).json({ error: Constants.ERROR_SERVER });
    }
};

export const getTerapia = async(req, res) => {
    try {
        const terapia = await Terapia.findById(req.params.id);
        if (!terapia) return res.status(404).json({ error: Constants.ERROR_TERAPIA_NOT_FOUND });

        return res.status(200).json({ terapia });

    } catch (error) {
        console.log(error.message); 
        if (error.kind === "ObjectId") {
            return res.status(400).json({ error: Constants.ERROR_PARAM_ID_INCORRECTO });
        }
        return res.status(500).json({ error: Constants.ERROR_SERVER });
    } 
};

export const saveTerapia = async(req, res) => {
    try {
        const { nombre, descripcion, tipo, recursos } = req.body;
        const terapia = new Terapia({ nombre, descripcion, tipo, recursos });

        await terapia.save();

        return res.status(201).json({ msg: Constants.RESPONSE_TERAPIA_CREADA_OK });

    } catch (error) {   
        console.log(error.message);    
        return res.status(500).json({ error: Constants.ERROR_SERVER });
    }
};

export const updateTerapia = async(req, res) => {
    try {
        const terapia = await Terapia.findByIdAndUpdate(req.params.id, req.body);
        if (!terapia) return res.status(404).json({ error: Constants.ERROR_TERAPIA_NOT_FOUND });

        return res.status(200).json({ msg: Constants.RESPONSE_TERAPIA_ACTUALIZADA_OK });

    } catch (error) {
        console.log(error.message); 
        if (error.kind === "ObjectId") {
            return res.status(400).json({ error: Constants.ERROR_PARAM_ID_INCORRECTO });
        }
        return res.status(500).json({ error: Constants.ERROR_SERVER });
    }
};

export const removeTerapia = async(req, res) => {
    try {
        const terapia = await Terapia.findByIdAndDelete(req.params.id);
        if (!terapia) return res.status(404).json({ error: Constants.ERROR_TERAPIA_NOT_FOUND });
        
        return res.status(200).json({ msg: Constants.RESPONSE_TERAPIA_ELIMINADA_OK });

    } catch (error) {
        console.log(error.message); 
        if (error.kind === "ObjectId") {
            return res.status(400).json({ error: Constants.ERROR_PARAM_ID_INCORRECTO });
        }
        return res.status(500).json({ error: Constants.ERROR_SERVER });
    }
};
