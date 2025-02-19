import mongoose from "mongoose";

const empleadoProyectoSchema = new mongoose.Schema({
    nombre: {type: String, required: [true, 'El nombre del empledado es obligatirio']},
    apellido: {type: String, required: [true, 'El apellido del empleado es obligatirio']},
    cargo: {type: String, required: [true, 'El cargo del empleado es obligatorio'] },
    idPersonal: { type: String, required: [true, 'El ID del empleado es obligatorio'], unique: true },
}, 
{
    timestamps: true,
}
);

const EmpleadoProyecto = mongoose.model("EmpleadoProyecto", empleadoProyectoSchema);

export default EmpleadoProyecto;