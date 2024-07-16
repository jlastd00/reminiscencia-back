import fs from "fs-extra";
import Recurso from "../models/Recurso.js";
import { deleteFile, uploadRecurso } from "../utils/cloudinary.js";
import * as Constants from "../utils/constants.js";
import Terapia from "../models/Terapia.js";

export const getRecursos = async (req, res) => {
    try {
        const recursos = await Recurso.find().populate('usuario'); 
        return res.status(200).json({ ok: true, recursos });
    
    } catch (error) {
        console.log(error.message); 
        return res.status(500).json({ errorMsg: Constants.ERROR_SERVER });
    }   
};

export const getRecurso = async (req, res) => {
    try {
        const recurso = await Recurso.findById(req.params.id).populate('usuario');
        if (!recurso) return res.status(404).json({ errorMsg: Constants.ERROR_RECURSO_NOT_FOUND });
        //if (!recurso.usuario.equals(req.uid)) return res.status(403).json({ errorMsg: Constants.ERROR_RECURSO_INACCESIBLE });

        return res.status(200).json({ ok: true, recurso });

    } catch (error) {
        console.log(error.message); 
        if (error.kind === "ObjectId") {
            return res.status(400).json({ errorMsg: Constants.ERROR_PARAM_ID_INCORRECTO });
        }
        return res.status(500).json({ errorMsg: Constants.ERROR_SERVER });
    } 
};

export const saveRecurso = async (req, res) => {
    try {
        const { publicId, url, nombre, esPublico, formato, tipo, fechaReferencia, descripcion } = req.body;
        const recurso = new Recurso({ 
            publicId, 
            url, 
            nombre, 
            usuario: req.uid, 
            fechaInsercion: new Date().toLocaleDateString(), 
            esPublico, 
            formato, 
            tipo, 
            fechaReferencia, 
            descripcion 
        });

        if (formato !== "web") {
            
            if (!req.files?.archivo) return res.status(400).json({ errorMsg: Constants.ERROR_ARCHIVO_NO_RECIBIDO });

            const { tempFilePath, mimetype } = req.files.archivo;

            const imageFileTypes = [ 'image/png', 'image/jpeg', 'image/jpg', 'image/gif' ];
            const videoFileTypes = [ 'video/mp4', 'video/mpeg', 'video/avi', 'video/ogg' ];
            const audioFileTypes = [ 'audio/mp3', 'audio/mp4', 'audio/mpeg', 'audio/ogg' ];

            if (formato === 'image' && !imageFileTypes.some((fileType) => fileType === mimetype)) {
                return res.status(400).json({ 
                    errorMsg: "Formato de archivo incorrecto! - Formatos de imágen válidos: [JPG, JPEG, PNG, GIF]"
                });
            }
            if (formato === 'video' && !videoFileTypes.some((fileType) => fileType === mimetype)) {
                return res.status(400).json({ 
                    errorMsg: "Formato de archivo incorrecto! - Formatos de video válidos: [MP4, MPEG, AVI, OGG]"
                });
            }
            if (formato === 'audio' && !audioFileTypes.some((fileType) => fileType === mimetype)) {
                return res.status(400).json({ 
                    errorMsg: "Formato de archivo incorrecto! - Formatos de audio válidos: [MP3, MP4, MPEG, OGG]"
                });
            }

            const uploadResult = await uploadRecurso(tempFilePath, formato);
            recurso.publicId = uploadResult.public_id;
            recurso.url = uploadResult.secure_url;
            //await fs.move(tempFilePath, "uploads/recursos/videos/" + name, { overwrite: true });

            await fs.unlink(tempFilePath);
        }

        await recurso.save();

        return res.status(200).json({ ok: true, msg: Constants.RESPONSE_RECURSO_CREADO_OK });

    } catch (error) {   
        console.log(error.message);    
        return res.status(500).json({ errorMsg: Constants.ERROR_SERVER });
    }
};

export const updateRecurso = async (req, res) => {
    try {
        const recurso = await Recurso.findByIdAndUpdate(req.params.id, req.body);
        if (!recurso) return res.status(404).json({ errorMsg: Constants.ERROR_RECURSO_NOT_FOUND });

        return res.status(200).json({ ok: true, msg: Constants.RESPONSE_RECURSO_ACTUALIZADO_OK });

    } catch (error) {
        console.log(error.message); 
        if (error.kind === "ObjectId") {
            return res.status(400).json({ errorMsg: Constants.ERROR_PARAM_ID_INCORRECTO });
        }
        return res.status(500).json({ errorMsg: Constants.ERROR_SERVER });
    }
};

export const removeRecurso = async (req, res) => {
    try {
        const recurso = await Recurso.findByIdAndDelete(req.params.id);
        if (!recurso) return res.status(404).json({ errorMsg: Constants.ERROR_RECURSO_NOT_FOUND });

        const terapias = await Terapia.find();
        let recursosList = [];
        for (const terapia of terapias) {
            terapia.recursos.forEach(r => {
                if (r._id !== recurso._id) {
                    recursosList.push(r);
                }
            });
            terapia.recursos = recursosList;
            await Terapia.updateOne(terapia);
        }

        if (recurso.publicId !== "") {
            await deleteFile(recurso.publicId);
        }

        return res.status(200).json({ ok: true, msg: Constants.RESPONSE_RECURSO_ELIMINADO_OK });

    } catch (error) {
        console.log(error.message); 
        if (error.kind === "ObjectId") {
            return res.status(400).json({ errorMsg: Constants.ERROR_PARAM_ID_INCORRECTO });
        }
        return res.status(500).json({ errorMsg: Constants.ERROR_SERVER });
    }
};
