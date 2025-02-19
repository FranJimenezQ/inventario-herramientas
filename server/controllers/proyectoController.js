import Proyecto from "../models/proyecto.js";
import Herramienta from "../models/herramienta.js";
import Movimiento from "../models/movimiento.js";

export const obtenerHerramientaPorProyecto = async ( req, res) => {
    try {
        const { proyectoId } = req.params;
        const movimientos = await Movimiento.findById({proyectoId, fechaDeDevolucion: null}).populate('herramientaId', 'nombre codigo modelo');

        const herramientas = await movimientos.map(movimiento => movimiento.herramienta.id);
        res.status(200).json(herramientas);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener herramientas por proyecto", error: error });
     }
}