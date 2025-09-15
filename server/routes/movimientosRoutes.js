import express from 'express';
import { obtenerHistorialPorHerramienta, devolverHerramienta } from '../controllers/movimiento.Controller.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/historial/:herramientaId', authMiddleware, obtenerHistorialPorHerramienta);
router.put('/devolver/:herramientaId', authMiddleware, devolverHerramienta);
export default router;