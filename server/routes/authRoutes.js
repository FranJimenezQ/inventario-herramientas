import express from 'express';
import { registrarUsuario, loginUsuario } from '../controllers/authController';


const router = express.Router();

router.post('/registrar', registrarUsuario);
router.post('/login', loginUsuario);

export default router;