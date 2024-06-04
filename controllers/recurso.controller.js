import Recurso from "../models/Recurso.js";
import * as Constants from "../utils/constants.js";

export const getRecursos = async (req, res) => {
    try {
        const recursos = await Recurso.find(); 
        return res.status(200).json({ recursos });
    
    } catch (error) {
        return res.status(500).json({ error: Constants.ERROR_SERVER });
    }   
};

export const getRecurso = async (req, res) => {
    try {
        const recurso = await Recurso.findById(req.params.id);
        if (!recurso) return res.status(404).json({ error: Constants.ERROR_RECURSO_NOT_FOUND });

        return res.status(200).json({ recurso: recurso });

    } catch (error) {
        return res.status(500).json({ error: Constants.ERROR_SERVER });
    } 
};

export const saveRecurso = async (req, res) => {
    try {
        const { nombre, url, esPublico, formato, tipo, fechaReferencia, descripcion } = req.body;
        const recurso = new Recurso({ 
            nombre, usuario: req.uid, url, esPublico, formato, tipo, fechaReferencia, descripcion 
        });
        const recursoGuardado = await recurso.save();
        return res.status(201).json({ recursoGuardado });

    } catch (error) {       
        return res.status(500).json({ error: Constants.ERROR_SERVER });
    }
};

export const updateRecurso = async (req, res) => {
    try {
        const recurso = await Recurso.findById(req.params.id);
        if (!recurso) return res.status(404).json({ error: Constants.ERROR_RECURSO_NOT_FOUND });
        if (!recurso.usuario.equals(req.uid)) return res.status(403).json({ error: Constants.ERROR_RECURSO_INACCESIBLE });

        await recurso.updateOne(req.body);

        return res.status(204).json({ msg: Constants.ERROR_RECURSO_ELIMINADO_OK });

    } catch (error) {
        return res.status(500).json({ error: Constants.ERROR_SERVER });
    }
};

export const removeRecurso = async (req, res) => {
    try {
        const recurso = await Recurso.findById(req.params.id);
        if (!recurso) return res.status(404).json({ error: Constants.ERROR_RECURSO_NOT_FOUND });
        if (!recurso.usuario.equals(req.uid)) return res.status(403).json({ error: Constants.ERROR_RECURSO_INACCESIBLE });

        await recurso.deleteOne();

        return res.status(204).json({ msg: Constants.ERROR_RECURSO_ELIMINADO_OK });

    } catch (error) {
        return res.status(500).json({ error: Constants.ERROR_SERVER });
    }
};
