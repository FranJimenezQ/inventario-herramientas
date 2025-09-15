import express from 'express';
import { crearHerramienta, obtenerHerramientaPorId, obtenerHerramientas, 
    actualizarHerramienta, eliminarHerramienta, asignarHerramienta, obtenerHerramientasPorProyecto,
    obtenerHistorialPorHerramienta } from '../controllers/herramientaController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
const router = express.Router();

router.post('/registrarHerramienta', authMiddleware, crearHerramienta);
router.get('/', authMiddleware, obtenerHerramientas);
router.get('/:id', authMiddleware, obtenerHerramientaPorId);
router.put('/actualizarHerramienta/:id', authMiddleware, actualizarHerramienta);
router.delete('/eliminarHerramienta/:id', authMiddleware, eliminarHerramienta);
router.put('/asignarHerramienta/:id', authMiddleware, asignarHerramienta);
router.get('/proyecto/:proyectoId', authMiddleware, obtenerHerramientasPorProyecto);
router.get('/historial/:herramientaId', authMiddleware, obtenerHistorialPorHerramienta);
//router.put('/devolverHerramienta/:herramientaId', authMiddleware, devolverHerramienta);
export default router;