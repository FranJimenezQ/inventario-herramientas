import Herramienta from "../models/herramienta.js";
import Usuario from "../models/usuario.js";
import Proyecto from "../models/proyecto.js";
import Movimiento from "../models/movimiento.js";
import mongoose from "mongoose";


//Crear una nueva herramienta
export const crearHerramienta = async (req, res) => {
    
    try {
        const { nombre, marca, modelo, tipo, numeroSerie } = req.body

        const nuevaHerramienta = new Herramienta({nombre, marca, modelo, tipo, numeroSerie});
        await nuevaHerramienta.save();

        res.status(201).json({message: 'Herramient creada satisfactoriamente', herramienta: nuevaHerramienta});

    } catch (error) {
        res.status(400).json({ message:'Error al crear herramienta', error: error });
    }
};

//Asignar una herramienta a un proyecto y un empleado
export const asignarHerramienta = async (req, res) => {
    try {
        const {id} = req.params;
        const {proyectoAsignado, empleadoAsignado, fechaDevolucion} = req.body;

        if (!mongoose.Types.ObjectId.isValid(id) || 
            !mongoose.Types.ObjectId.isValid(proyectoAsignado) ||
            !mongoose.Types.ObjectId.isValid(empleadoAsignado)
        ) {
            return res.status(400).json({message: 'ID inválido'});
        }

        const herramienta = await Herramienta.findById(id);
        if (!herramienta) {
            return res.status(404).json({message: 'Herramienta no encontrada'});
        }
        const nuevoMovimiento = new Movimiento({
            herramientaId: herramienta._id,
            proyectoId: proyectoAsignado,
            empleadoSolicitante: empleadoAsignado,
            fechaDePrestamo: new Date(),
            fechaDevolucion:  null,
        });
        await nuevoMovimiento.save();

        herramienta.proyectoAsignado = proyectoAsignado;
        herramienta.empleadoAsignado = empleadoAsignado;
        herramienta.fechaSalida = new Date();
        herramienta.fechaRegreso = null;
        await herramienta.save();

        res.status(200).json({message: 'Herramienta asignada correctamente', movimiento: nuevoMovimiento});

    } catch (error) {
        res.status(400).json({ message:'Error al asignar herramienta', error: error });
    }
}
// Obtener herramientas
export const obtenerHerramientas = async (req, res) => {
    try {
        const herramientas = await Herramienta.find()
        .populate('proyectoAsignado', 'nombre numeroProyecto')
        .populate('empleadoAsignado', 'nombre apellido');
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

        res.status(200).json({message: 'Herramienta actualizada', herramienta: herramientaActualizada});
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


//Obtener historial por herramienta
export const obtenerHistorialPorHerramienta = async (req, res) => {
    try {
        const { herramientaId } = req.params;
        const historial = await Movimiento.find({ herramientaId: herramientaId })
        .populate('proyectoId', 'nombre')
        .populate('empleadoSolicitante', 'nombre')
        .sort({fechaSalida: -1});
        res.json(historial);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener historial por herramienta', error: error });
    }
};

// Devolver una  herramienta
export const devolverHerramienta = async (req, res) => {
    try {
        const { herramientaId } = req.params;
        const { fechaDevolucion } = req.body;

        
        if (!fechaDevolucion) {
            return res.status(404).json({ message: 'Fecha de devolución requerida'});
        }
        const herramienta = await Herramienta.findById(herramientaId);
        if (!herramienta) {
            return res.status(404).json({message: 'Herramienta no encontrada'});
        }

        const movimiento = await Movimiento.findOne({
            herramientaId: herramienta._id,
            fechaDevolucion: null
        }).sort({fechaDePrestamo: -1});
        if (!movimiento) {  
            return res.status(400).json({message: 'No hay movimientos recientes'} )
        }
        movimiento.fechaDevolucion = fechaDevolucion;
        await movimiento.save();
        herramienta.proyectoAsignado = null;
        herramienta.empleadoAsignado = null;
        herramienta.fechaRegreso = new Date();
        await herramienta.save();
        res.status(200).json({message: 'Herramienta devuelta correctamente', movimiento: movimiento});

        } catch (error) {
        res.status(400).json({ message:'Error al devolver herramienta', error: error });
        }
     }