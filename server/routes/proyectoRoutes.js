import express from 'express';
import ProyectoController from '../controllers/proyectoController';

const router = express.Router();

router.get('/:proyectoId/herramientas', ProyectoController.obtenerHerramientaPorProyecto);