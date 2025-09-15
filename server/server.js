import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import herramientaRoutes from './routes/herramientaRoutes.js';
import authRoutes from './routes/authRoutes.js';
import empleadosRoutes from './routes/empleadoRoutes.js';
import proyectosRoutes from './routes/proyectoRoutes.js';
import movimientosRoutes from './routes/movimientosRoutes.js';

const app = express();
const port = process.env.PORT || 3000;

connectDB();

app.use(cors());
app.use(express.json());


app.use('/api/auth', authRoutes);
app.use('/api/herramientas', herramientaRoutes);
app.use('/api/empleados', empleadosRoutes);
app.use('/api/proyectos', proyectosRoutes);
app.use('/api/movimientos', movimientosRoutes);

app.use((req, res ) => {
    res.status(404).json({ message: 'Ruta no encontrada' });
 });
app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
});