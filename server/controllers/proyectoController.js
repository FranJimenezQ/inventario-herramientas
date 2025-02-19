import Proyecto from "../models/proyecto.js";
import Herramienta from "../models/herramienta.js";
import Movimiento from "../models/movimiento.js";

//Crear un proyecto
export const crearProyecto = async (req, res) => {
    const { nombre, numeroProyecto, direccion } = req.body;

    try {
        const nuevoProyecto = new Proyecto({ nombre, numeroProyecto, direccion  });
        await nuevoProyecto.save();
        res.status(201).json({ message: "Proyecto creado correctamente", proyecto: nuevoProyecto });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al crear un proyecto", error: error });
    }
};

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