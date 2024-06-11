import {v2 as cloudinary} from 'cloudinary';

const folderRecursos = {
    "image": "recursos/imagenes",
    "video": "recursos/videos",
    "audio": "recursos/audio"
}

// Configuration
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
});

export const uploadFotoPaciente = async (ruta) => {
    return await cloudinary.uploader.upload(ruta, {
        folder: 'fotosPacientes'
    });
};

export const uploadRecurso = async (ruta, tipo) => {
    return await cloudinary.uploader.upload(ruta, {
        folder: folderRecursos[tipo]
    });
};

export const deleteFile = async (publicId) => {
    return await cloudinary.uploader.destroy(publicId);
};

