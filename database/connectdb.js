import mongoose from 'mongoose';

try {
    const db = await mongoose.connect(process.env.URI_BBDD);
    console.log("Conexión establecida con la base de datos: " + db.connection.name);

} catch (error) {
    console.log("Error de conexión a BBDD " + error);
}

