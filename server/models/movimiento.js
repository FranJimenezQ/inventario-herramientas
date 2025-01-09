import mongoose from "mongoose";


const movimientoSchema = new mongoose.Schema({
    herramientaId: {  type: mongoose.Schema.Types.ObjectId, ref: "Herramienta" },
    proyectoId: { type: mongoose.Schema.Types.ObjectId, ref: " Proyecto" },
    empleadoSolicitante: { type: mongoose.Schema.Types.ObjectId, ref: " EmpleadoProyecto" },
    fechaDePrestamo: { type: Date , required: true },
    fechaDevolucion: { type: Date , required: true },
});

const Movimiento = mongoose.model("Movimiento", movimientoSchema);

export default Movimiento;