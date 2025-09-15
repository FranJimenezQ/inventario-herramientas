import express from 'express';
import { crearEmpleado, obtenerEmpleadoPorId, obtenerEmpleados, actualizarEmpleado, eliminarEmpleado } from '../controllers/empleadoController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
const router = express.Router();

router.post('/', authMiddleware, crearEmpleado);
router.get('/', authMiddleware, obtenerEmpleados);
router.get('/:id', authMiddleware, obtenerEmpleadoPorId);
router.put('/:idPersonal', authMiddleware, actualizarEmpleado);
router.delete('/:idPersonal', authMiddleware, eliminarEmpleado);

export default router;