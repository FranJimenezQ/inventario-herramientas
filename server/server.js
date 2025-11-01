import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import herramientaRoutes from './routes/herramientaRoutes.js';
import authRoutes from './routes/authRoutes.js';
import empleadosRoutes from './routes/empleadoRoutes.js';
import proyectosRoutes from './routes/proyectoRoutes.js';
import movimientosRoutes from './routes/movimientosRoutes.js';
import usuariosRoutes from './routes/usuariosRoutes.js';

const app = express();
const port = process.env.PORT || 3000;

connectDB();

//app.use(cors());

//CORS configuration for production
const corsOptions = {
    origin: process.env.FRONTEND_URL || 'http://localhost:4200',
    credentials: true,
    optionsSuccessStatus: 200,
}
app.use(cors(corsOptions));
app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.status(200).json({ 
        status: 'OK', 
        message: 'API is healthy',
        environment: process.env.NODE_ENV || 'development'
    });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/herramientas', herramientaRoutes);
app.use('/api/empleados', empleadosRoutes);
app.use('/api/proyectos', proyectosRoutes);
app.use('/api/movimientos', movimientosRoutes);
//app.use('/api/usuarios', usuariosRoutes);

app.use((req, res ) => {
    res.status(404).json({ 
        message: 'Ruta no encontrada',
        path: req.path 
    });
 });

 // Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        message: 'Error interno del servidor',
        error: process.env.NODE_ENV === 'development' ? err.message :  undefined
    });
});

app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
    console.log(`Entorno: ${process.env.NODE_ENV || 'desarrollo'}`);
});