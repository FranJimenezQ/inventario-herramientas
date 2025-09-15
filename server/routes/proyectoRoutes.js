import express from 'express';
import {crearProyecto, eliminarProyecto, obtenerHerramientaPorProyecto, obtenerProyectos} from '../controllers/proyectoController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
const router = express.Router();

router.get('/', authMiddleware, obtenerProyectos);
router.get('/:numeroProyecto/herramientas', authMiddleware, obtenerHerramientaPorProyecto);
router.delete('/:numeroProyecto', authMiddleware, eliminarProyecto);
router.post('/registrarProyecto', authMiddleware, crearProyecto);
export default router;