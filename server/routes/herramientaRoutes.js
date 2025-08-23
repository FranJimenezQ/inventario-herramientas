import express from 'express';
import { crearHerramienta, obtenerHerramientaPorId, obtenerHerramientas, 
    actualizarHerramienta, eliminarHerramienta, asignarHerramienta, obtenerHerramientasPorProyecto,
    obtenerHistorialPorHerramienta, 
    devolverHerramienta} from '../controllers/herramientaController.js';

const router = express.Router();

router.post('/registrarHerramienta', crearHerramienta);
router.get('/', obtenerHerramientas);
router.get('/:id', obtenerHerramientaPorId);
router.put('/actualizarHerramienta/:id', actualizarHerramienta);
router.delete('/eliminarHerramienta/:id', eliminarHerramienta);
router.put('/asignarHerramienta/:id', asignarHerramienta);
router.get('/proyecto/:proyectoId', obtenerHerramientasPorProyecto);
router.get('/historial/:herramientaId', obtenerHistorialPorHerramienta);
router.put('/devolverHerramienta/:herramientaId', devolverHerramienta);
export default router;