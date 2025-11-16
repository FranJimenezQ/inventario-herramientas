import Movimiento from "../models/movimiento.js";
import Herramienta from "../models/herramienta.js"; 

// Obtener historial por herramienta
export const obtenerHistorialPorHerramienta = async (req, res) => {
  try {
    const { herramientaId } = req.params;
    const historial = await Movimiento.find({ herramientaId })
      .populate('proyectoId', 'nombre')
      .populate('empleadoSolicitante', 'nombre apellido')
      .sort({ fechaDePrestamo: -1 });
    res.json(historial);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener historial', error });
  }
};

//Cerrar un movimiento (devolver herramienta)
export const devolverHerramienta = async (req, res) => {
  try {
    const { herramientaId } = req.params;
    const { fechaDevolucion, estado } = req.body;
  
    console.log(herramientaId, fechaDevolucion, estado);

    if (!fechaDevolucion) {
        return res.status(400).json({ message: 'Fecha de devolución requerida' });
    }

    const herramientaObjectId = mongoose.Types.ObjectId(herramientaId);
    console.log('HerramientaId: ', herramientaId);

    const movimiento = await Movimiento.findOne({
      herramientaId: herramientaObjectId,
      fechaDevolucion: null
    }).sort( {fechaDePrestamo: -1});

    if (!movimiento) {
      return res.status(404).json({ message: 'Movimiento no encontrado' });
    }

    movimiento.fechaDevolucion = fechaDevolucion;
    await movimiento.save();

    //Actualizar la herramienta como disponible
    const herramienta = await Herramienta.findById(herramientaId);
    if (herramienta) {
      herramienta.empleadoAsignado = null;
      herramienta.proyectoAsignado = null;
      herramienta.fechaRegreso = new Date(fechaDevolucion);
      herramienta.estado = estado; // Usa el estado enviado por el frontend
      await herramienta.save();
    }

    res.json({ message: 'Movimiento cerrado correctamente', movimiento, herramienta });
  } catch (error) {
    res.status(500).json({ message: 'Error al cerrar movimiento', error });
  }
};
