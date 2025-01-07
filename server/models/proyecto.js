import mongoose from "mongoose";

const proyectoSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    numeroProyecto: { type: String, unique: true, required: true },
    direccion: { type: String, required: true },
});

const Proyecto = mongoose.model("Proyecto", proyectoSchema);

export default Proyecto;