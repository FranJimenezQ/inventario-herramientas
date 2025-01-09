import express from 'express';
import { crearEmpleado, obtenerEmpleadoPorId, obtenerEmpleados, actualizarEmpleado, eliminarEmpleado } from '../controllers/empleadoController';

const router = express.Router();

router.post('/', crearEmpleado);
router.get('/', obtenerEmpleados);
router.get('/:id', obtenerEmpleadoPorId);
router.put('/:id', actualizarEmpleado);
router.delete('/:id', eliminarEmpleado);

export default router;