import Herramienta from "../modelsherramienta.js";
import Usuario from "../models/usuario.js";
import Proyecto from "../models/proyecto.js";


//Crear una nueva herramienta
export const crearHerramienta = async (req, res) => {
    
    try {
        const { nombre, marca, modelo, tipo } = req.body
        
        const nuevaHerramienta = new Herramienta({nombre, marca, modelo, tipo});
        await nuevaHerramienta.save();

        res.status(201).json({message: 'Herramient creada satisfactoriamente', herramienta: nuevaHerramienta});

    } catch (error) {
        res.status(400).json({ message:'Error al crear herramienta', error: error });
    }
};

//Asignar una herramienta a un proyecto y un empleado
export const asignarHerramienta = async (req, res) => {
    try {
        const {id} = req.params.id;
        const {proyectoAsignado, usuarioAsignado} = req.body;

        const herramienta = await Herramienta.findById(id);
        if (!herramienta) {
            return res.status(404).json({message: 'Herramienta no encontrada'});
        }

        herramienta.proyectoAsignado = proyectoAsignado;
        herramienta.usuarioAsignado = usuarioAsignado;
        await herramienta.save();

        res.status(200).json({message: 'Herramienta asignada correctamente'});

    } catch (error) {
        res.status(400).json({ message:'Error al asignar herramienta', error: error });
    }
}
// Obtener herramientas
export const obtenerHerramientas = async (req, res) => {
    try {
        const herramientas = await Herramienta.find();
        res.json(herramientas);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener herramientas', error: error });
    }
};
// Obtener  una herramienta por ID
export const obtenerHerramientaPorId = async (req, res) => {
    try {
        const {id} = req.params;
        const herramienta = await Herramienta.findById(id);

        if (!herramienta) {
            return res.status(404).json({message: 'Herramienta no encontrada'});
        }

        res.json(herramienta);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener herramienta', error: error });
    }
};

// Actualizar  una herramienta por ID
export const actualizarHerramienta = async (req, res) => {
    try {
        const {id} = req.params;
        const datosActualizados = req.body;

        const herramientaActualizada = await Herramienta.findByIdAndUpdate(id, datosActualizados, { new: true });

        if (!herramientaActualizada) {
            return res.status(404).json({message: 'Herramienta no encontrada'});
        }

        res.status(200).json({message: 'Herramienta actualizada', herramienta: herramientaActual});
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar herramienta', error: error });
    }
};

// Eliminar una herramienta

export const eliminarHerramienta = async (req, res) => {
    try {
        const {id} = req.params;
        const herramientaEliminada = await Herramienta.findByIdAndDelete(id);

        if (!herramientaEliminada) {
            return res.status(404).json({message: 'Herramienta no encontrada'});
        }

        res.status(200).json({message: 'Herramienta eliminada', herramienta: herramientaEliminada});
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar herramienta', error: error });
    }
};


//Obtener herramientas por proyecto
export const obtenerHerramientasPorProyecto = async (req, res) => {
    try {
        const { proyectoId } = req.params;
        const herramientas = await Herramienta.find({ proyectoAsignado: proyectoId });
        res.json(herramientas);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener herramientas por proyecto', error: error });
    }
};