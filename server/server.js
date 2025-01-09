import express from 'express';
import cors from 'cors';
import  json  from 'body-parser';
import connectDB from './config/db.js';
import herramientaRoutes from './routes/herramientaRoutes.js';
import authRoutes from './routes/authRoutes.js';
import { authMiddleware } from './middleware/authMiddleware.js';
import empleadosRoutes from './routes/empleadoRoutes.js';


const app = express();
const port = process.env.PORT || 3000;

connectDB();

app.use(cors());
app.use(json());


app.use('/api/auth', authRoutes);
app.use('/api/herramientas', herramientaRoutes, authMiddleware);
app.use('/api/empleados', empleadosRoutes);

app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
});