import express from 'express';
import { registrarUsuario, loginUsuario, actualizarUsuario, eliminarUsuario, obtenerUsuarios } from '../controllers/authController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/login', loginUsuario);
router.post('/registrarUsuario', registrarUsuario);
router.put('/actualizarUsuario/:_id', authMiddleware, actualizarUsuario);
router.delete('/eliminarUsuario/:_id', authMiddleware, eliminarUsuario);
router.get('/obtenerUsuarios', authMiddleware, obtenerUsuarios);

export default router;