import Proyecto from "../models/proyecto";
import Herramienta from "../models/herramienta";
import Movimiento from "../models/movimiento";

export const obtenerHerramientaPorProyecto = async ( req, res) => {
    try {
        const { proyectoId } = req.params;
        const movimientos = await Movimiento.findById({proyectoId, fechaDeDevolucion: null}).populate('herramientaId', 'nombre codigo modelo');

        const herramientas = await movimientos.map(movimiento => herramientas.id);
        res.status(200).json(herramientas);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener herramientas por proyecto", error: error });
     }
}