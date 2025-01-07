import mongoose from 'mongoose';

const herramientasSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    marca: { type: String, required: true },
    modelo: { type: String, required: true },
    tipo: { type: String, required: true},
    proyectoAsignado: { type: mongoose.Schema.Types.ObjectId, ref:'Proyecto' },
    usuarioAsignado: { type: mongoose.Schema.Types.ObjectId, ref:'Usuario' },
    fechaSalida: { type: Date},
    fechaRegreso: { type: Date},
    id: { type: String, required: true, unique: true },
});

const Herramienta = mongoose.model('Herramienta', herramientasSchema)

export default Herramienta;