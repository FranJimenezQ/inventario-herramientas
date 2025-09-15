import express from 'express';
import { registrarUsuario, loginUsuario, actualizarUsuario, eliminarUsuario } from '../controllers/authController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/registrar', registrarUsuario);
router.post('/login', loginUsuario);
router.put('/update/:id', authMiddleware, actualizarUsuario);
router.delete('/eliminar/:id', authMiddleware, eliminarUsuario);

export default router;