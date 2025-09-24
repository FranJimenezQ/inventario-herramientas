import express from 'express';
import {crearProyecto, eliminarProyecto, obtenerHerramientaPorProyecto, obtenerProyectos, actualizarProyecto} from '../controllers/proyectoController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', authMiddleware, obtenerProyectos);
router.get('/:numeroProyecto/herramientas', authMiddleware, obtenerHerramientaPorProyecto);
router.delete('/eliminarProyecto/:proyectoId', authMiddleware, eliminarProyecto);
router.post('/registrarProyecto', authMiddleware, crearProyecto);
router.put('/actualizarProyecto/:proyectoId', authMiddleware, actualizarProyecto);

export default router;