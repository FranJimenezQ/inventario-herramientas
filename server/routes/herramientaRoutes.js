import express from 'express';
import { crearHerramienta, obtenerHerramientaPorId, obtenerHerramientas, 
    actualizarHerramienta, eliminarHerramienta, asignarHerramienta, obtenerHerramientasPorProyecto,
    obtenerHistorialPorHerramienta, 
    devolverHerramienta} from '../controllers/herramientaController.js';

const router = express.Router();

router.post('/registrarHerramienta', crearHerramienta);
router.get('/', obtenerHerramientas);
router.get('/:id', obtenerHerramientaPorId);
router.put('/:id', actualizarHerramienta);
router.delete('/:id', eliminarHerramienta);
router.put('/:id/asignar', asignarHerramienta);
router.get('/proyecto/:proyectoId', obtenerHerramientasPorProyecto);
router.get('/:herramientaId/historial', obtenerHistorialPorHerramienta);
router.put('/:herramientaId/devolver', devolverHerramienta);
export default router;