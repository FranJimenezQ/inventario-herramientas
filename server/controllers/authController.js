import Usuario from "../models/usuario.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

//Registro de nuevo usuario
export const registrarUsuario = async (req, res) => {
    try {
        const { nombre, apellido, email, id, rol, password } = req.body;

        // Validar campos requeridos
        if (!nombre || !apellido || !email || !id || !rol || !password) {
            return res.status(400).json({ message: "Todos los campos son obligatorios" });
        }

        // Verificar si el email o ID ya están registrados
        const existeEmail = await Usuario.findOne({ email });
        if (existeEmail) {
            return res.status(400).json({ message: "El email ya está registrado" });
        }

        const existeUsuario = await Usuario.findOne({ id });
        if (existeUsuario) {
            return res.status(400).json({ message: "El ID ya está registrado" });
        }

        // Hashear la contraseña
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Crear el nuevo usuario
        const nuevoUsuario = new Usuario({
            nombre,
            apellido,
            email,
            id,
            rol,
            password: hashedPassword,
        });
        await nuevoUsuario.save();

        res.status(201).json({ message: "Usuario registrado correctamente" });
    } catch (error) {
        console.error("Error al registrar usuario:", error.message);
        res.status(500).json({ message: "Ocurrió un error en el servidor" });
    }
};

//Login de usuario
export const loginUsuario = async (req, res) => {
    const { email, password } = req.body;
     try {

        //Verificar si el usuario existe
        const usuario = await Usuario.findOne({ email });
        if (!usuario) return res.status(400).json({ message: "Usuario no encontrado" });

        //Comprobar la contraseña
        const validPassword = await bcrypt.compare(password, usuario.password);
        if (!validPassword) return res.status(400).json({ message: "Contraseña incorrecta" });

        //Generar el token JWT
        const token = jwt.sign({ id: usuario.email  , rol: usuario.rol }, JWT_SECRET, { expiresIn: '24h' });

        res.status(200).json({ message: 'Inicio de sesión exitoso', token });
        } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error en el server" });
        }
    }

//Actualizar Usuario
export const actualizarUsuario = async (req, res) => {
        const { id } = req.params;
        const nuevosDatos = req.body || {};

        try {
            const usuarioExistente = await Usuario.findOne({id});
            if (!usuarioExistente) {
                return res.status(404).json({ message: "Usuario no encontrado" });
            }

        if (!nuevosDatos.email) {
            nuevosDatos.email = usuarioExistente.email;
        }

        if (nuevosDatos.password) {
            const salt = await bcrypt.genSalt(10);
            nuevosDatos.password = await bcrypt.hash(nuevosDatos.password, salt);
        } else {
            nuevosDatos.password = usuarioExistente.password; 
        }

        const usuarioActualizado = await Usuario.findOneAndUpdate(
            { id }, 
            { $set: nuevosDatos }, 
            { new: true, runValidators: true }
        );

            //const usuarioActualizado = await usuarioExistente.save();
            res.status(200).json({ 
                message: "Usuario actualizado correctamente",
                usuario: {
                    id: usuarioActualizado.id,
                    nombre: usuarioActualizado.nombre,
                    apellido: usuarioActualizado.apellido,
                    email: usuarioActualizado.email,
                    rol: usuarioActualizado.rol,
                    password: "*******" // No se devuelve la contraseña para seguridad.
                } });
        } catch (error) {
            console.error("Error al actualizar usuario:", error.message);
            res.status(500).json({ message: "Error al actualizar usuario", error: error });
        }
    };

// Eliminar un usuario
export const eliminarUsuario = async (req, res) => {
        const { id } = req.params;

        try {
            const usuarioExistente = await Usuario.findOneAndDelete({ id });
            if (!usuarioExistente) {
                return res.status(404).json({ message: "Usuario no encontrado" });
            }

            res.status(200).json({ message: "Usuario eliminado correctamente" });
        } catch (error) {
            console.error("Error al eliminar usuario:", error.message);
            res.status(500).json({ message: "Error al eliminar usuario", error: error });
        }
    };