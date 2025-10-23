import express from 'express';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { registrarUsuario, actualizarUsuario, eliminarUsuario, obtenerUsuarios } from '../controllers/authController.js';

const router = express.Router();

router.post('/registrarUsuario', registrarUsuario);
router.get('/obtenerUsuarios', authMiddleware, obtenerUsuarios);
router.delete('/eliminarUsuario/:id', authMiddleware, eliminarUsuario);
router.put('/actualizarUsuario/:id', authMiddleware, actualizarUsuario);

export default router;
