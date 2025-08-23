import mongoose from 'mongoose';

const herramientasSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    marca: { type: String, required: true },
    modelo: { type: String, required: true },
    tipo: { type: String, required: true},
    proyectoAsignado: { type: mongoose.Schema.Types.ObjectId, ref:'Proyecto' },
    empleadoAsignado: { type: mongoose.Schema.Types.ObjectId, ref:'EmpleadoProyecto' },
    fechaSalida: { type: Date},
    fechaRegreso: { type: Date},
    numeroSerie: { type: Number, required: true },
    estado: { type: String, enum: ['Bueno', 'Malo', 'En reparación'], required: true }
});

const Herramienta = mongoose.model('Herramienta', herramientasSchema)

export default Herramienta;