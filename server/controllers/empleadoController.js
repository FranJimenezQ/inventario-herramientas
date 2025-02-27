import EmpleadoProyecto from "../models/empleado.js";

export const crearEmpleado = async (req, res) => {
    const { nombre, apellido, cargo, idPersonal } = req.body;
    try {
        const nuevoEmpleado = new EmpleadoProyecto({ nombre, apellido, cargo, idPersonal });
        await nuevoEmpleado.save();
        res.status(201).json({ message: "Empleado creado correctamente", empleado: nuevoEmpleado });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al crer un empleado", error: error });
    }
};

export const obtenerEmpleados = async (req, res) => {
    try {
        const empleados = await EmpleadoProyecto.find();
        res.json(empleados);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener empleados", error: error });
    }
};

export const obtenerEmpleadoPorId = async (req, res) => {
    const { idPersonal } = req.params;
    try {
        const empleado = await EmpleadoProyecto.findOne(idPersonal);
        if (!empleado) {
            return res.status(404).json({ message: "Empleado no encontrado" });
        }
        res.json(empleado);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener empleado", error: error });
    }
};

export const actualizarEmpleado = async (req, res) => {
    const { idPersonal } = req.params;
    const datosActualizados = req.body;
    try {
        const empleado = await EmpleadoProyecto.findOneAndUpdate({idPersonal: idPersonal}, datosActualizados, { new: true });
        if (!empleado) {
            return res.status(404).json({ message: "Empleado no encontrado" });
        }
        res.json(empleado);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al actualizar empleado", error: error });
    }
};

export const eliminarEmpleado = async (req, res) => {
    const { idPersonal } = req.params;
    try {
        const empleadoEliminado = await EmpleadoProyecto.findOneAndDelete({idPersonal: idPersonal});
        if (!empleadoEliminado) {
            return res.status(404).json({ message: "Empleado no encontrado" });
        }
        res.json({ message: "Empleado eliminado correctamente" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al eliminar empleado", error: error });
    }
};
