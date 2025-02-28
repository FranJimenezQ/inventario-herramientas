import express from 'express';
import {crearProyecto, eliminarProyecto, obtenerHerramientaPorProyecto} from '../controllers/proyectoController.js';

const router = express.Router();

router.get('/:numeroProyecto/herramientas', obtenerHerramientaPorProyecto);
router.delete('/:numeroProyecto', eliminarProyecto);
router.post('/registrarProyecto', crearProyecto);
export default router;