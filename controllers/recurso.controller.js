import fs from "fs-extra";
import Recurso from "../models/Recurso.js";
import { deleteFile, uploadRecurso } from "../utils/cloudinary.js";
import * as Constants from "../utils/constants.js";

export const getRecursos = async (req, res) => {
    try {
        const recursos = await Recurso.find({ usuario: req.uid }); 
        return res.status(200).json({ recursos });
    
    } catch (error) {
        console.log(error.message); 
        return res.status(500).json({ error: Constants.ERROR_SERVER });
    }   
};

export const getRecurso = async (req, res) => {
    try {
        const recurso = await Recurso.findById(req.params.id);
        if (!recurso) return res.status(404).json({ error: Constants.ERROR_RECURSO_NOT_FOUND });
        if (!recurso.usuario.equals(req.uid)) return res.status(403).json({ error: Constants.ERROR_RECURSO_INACCESIBLE });

        return res.status(200).json({ recurso });

    } catch (error) {
        console.log(error.message); 
        if (error.kind === "ObjectId") {
            return res.status(400).json({ error: Constants.ERROR_PARAM_ID_INCORRECTO });
        }
        return res.status(500).json({ error: Constants.ERROR_SERVER });
    } 
};

export const saveRecurso = async (req, res) => {
    try {
        const { publicId, url, nombre, esPublico, formato, tipo, fechaReferencia, descripcion } = req.body;
        const recurso = new Recurso({ 
            publicId, url, nombre, usuario: req.uid, esPublico, formato, tipo, fechaReferencia, descripcion 
        });

        if (tipo !== "web") {
            
            if (!req.files?.archivo) return res.status(400).json({ error: Constants.ERROR_ARCHIVO_NO_RECIBIDO });

            const { tempFilePath, mimetype } = req.files.archivo;
            const fileTypes = [ 
                'image/png', 'image/jpeg', 'image/jpg', 'image/gif',
                'audio/mp3', 'audio/mp4', 'audio/mpeg', 'audio/ogg', 
                'video/mp4', 'video/mpeg', 'video/avi', 'video/ogg'
            ];
            if (!fileTypes.some((fileType) => fileType === mimetype)) {
                return res.status(400).json({ 
                    error: "Formato de archivo incorrecto! " + 
                    "Válido: [Imagen: JPG, JPEG, PNG, GIF - Audio: MP3, MP4, MPEG, OGG - Video: MP4, MPEG, AVI, OGG]"
                });
            }

            const uploadResult = await uploadRecurso(tempFilePath, tipo);
            recurso.publicId = uploadResult.public_id;
            recurso.url = uploadResult.secure_url;

            fs.unlink(tempFilePath);
        }

        await recurso.save();

        return res.status(201).json({ msg: Constants.RESPONSE_RECURSO_CREADO_OK });

    } catch (error) {   
        console.log(error.message);    
        return res.status(500).json({ error: Constants.ERROR_SERVER });
    }
};

export const updateRecurso = async (req, res) => {
    try {
        const recurso = await Recurso.findByIdAndUpdate(req.params.id, req.body);
        if (!recurso) return res.status(404).json({ error: Constants.ERROR_RECURSO_NOT_FOUND });

        return res.status(200).json({ msg: Constants.RESPONSE_RECURSO_ACTUALIZADO_OK });

    } catch (error) {
        console.log(error.message); 
        if (error.kind === "ObjectId") {
            return res.status(400).json({ error: Constants.ERROR_PARAM_ID_INCORRECTO });
        }
        return res.status(500).json({ error: Constants.ERROR_SERVER });
    }
};

export const removeRecurso = async (req, res) => {
    try {
        const recurso = await Recurso.findByIdAndDelete(req.params.id);
        if (!recurso) return res.status(404).json({ error: Constants.ERROR_RECURSO_NOT_FOUND });

        if (recurso.publicId !== "") {
            await deleteFile(recurso.publicId);
        }

        return res.status(200).json({ msg: Constants.RESPONSE_RECURSO_ELIMINADO_OK });

    } catch (error) {
        console.log(error.message); 
        if (error.kind === "ObjectId") {
            return res.status(400).json({ error: Constants.ERROR_PARAM_ID_INCORRECTO });
        }
        return res.status(500).json({ error: Constants.ERROR_SERVER });
    }
};
