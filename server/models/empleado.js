import mongoose from "mongoose";

const empleadoProyectoSchema = new mongoose.Schema({
    nombre: {type: String, required: true},
    apellido: {type: String, required: true},
    cargo: {type: String, required: true },
    id: { type: String, required: true, unique: true },
});

const EmpleadoProyecto = mongoose.model("EmpleadoProyecto", empleadoProyectoSchema);

export default EmpleadoProyecto;