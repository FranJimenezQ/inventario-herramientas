import express from 'express';
import { crearEmpleado, obtenerEmpleadoPorId, obtenerEmpleados, actualizarEmpleado, eliminarEmpleado } from '../controllers/empleadoController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
const router = express.Router();

router.post('/registrarEmpleado', authMiddleware, crearEmpleado);
router.get('/', authMiddleware, obtenerEmpleados);
router.get('/:id', authMiddleware, obtenerEmpleadoPorId);
router.put('/actualizarEmpleado/:_id', authMiddleware, actualizarEmpleado);
router.delete('/eliminarEmpleado/:empleadoId', authMiddleware, eliminarEmpleado);

export default router;