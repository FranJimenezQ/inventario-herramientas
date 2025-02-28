import express from 'express';
import { registrarUsuario, loginUsuario, actualizarUsuario, eliminarUsuario } from '../controllers/authController.js';


const router = express.Router();

router.post('/registrar', registrarUsuario);
router.post('/login', loginUsuario);
router.put('/update/:id', actualizarUsuario);
router.delete('/eliminar/:id', eliminarUsuario);

export default router;