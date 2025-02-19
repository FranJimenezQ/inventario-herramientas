import express from 'express';
import ProyectoController from '../controllers/proyectoController.js';

const router = express.Router();

router.get('/:proyectoId/herramientas', ProyectoController.obtenerHerramientaPorProyecto);

export default router;