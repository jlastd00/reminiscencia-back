import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const { Schema, model } = mongoose;
const userSchema = new Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        index: { unique: true }
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    pacientes: [{
        ref: 'Paciente',
        type: Schema.Types.ObjectId
    }],
}, {
    versionKey: false
});

userSchema.pre("save", async function (next) {
    const user = this;

    if (!user.isModified("password")) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        next();
    } catch (error) {
        console.log(error);
        throw new Error("Error al codificar la contraseña");
    }
});

userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

export default model("Usuario", userSchema);
