import express from 'express';
import { crearHerramienta, obtenerHerramientaPorId, obtenerHerramientas, actualizarHerramienta, eliminarHerramienta, asignarHerramienta, obtenerHerramientasPorProyecto } from '../controllers/herramientaController.js';

const router = express.Router();

router.post('/', crearHerramienta);
router.get('/', obtenerHerramientas);
router.get('/', obtenerHerramientaPorId);
router.put('/:id', actualizarHerramienta);
router.delete('/:id', eliminarHerramienta);
router.put('/:id', asignarHerramienta);
router.get('/proyecto/proyectoId', obtenerHerramientasPorProyecto);


export default router;