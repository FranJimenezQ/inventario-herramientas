import express from 'express';
import {crearProyecto, obtenerHerramientaPorProyecto} from '../controllers/proyectoController.js';

const router = express.Router();

router.get('/:proyectoId/herramientas', obtenerHerramientaPorProyecto);
router.post('/registrarProyecto', crearProyecto);
export default router;