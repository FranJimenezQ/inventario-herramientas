import Usuario from "../models/usuario";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = "mysecret";

//Registro de nuevo usuario
export const registrarUsuario = async (req, res) => {
    try {
        const { nombre, apellido, id, rol, password } = req.body;

        //Verificar si el usuario ya existe
        const existeUsuario = await Usuario.findOne({ id });
        if (existeUsuario) return res.status(400).json({ message: "El usuario ya existe" });

        //Hashear la contraseña
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //Crear el nuevo usuario
        const nuevoUsuario = new Usuario({ nombre, apellido, id, rol, password: hashedPassword });
        await nuevoUsuario.save();

        res.json({ message: "Usuario registrado correctamente" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error en el server" });
    }
};

//Login de usuario
export const loginUsuario = async (req, res) => {
    const { id, password } = req.body;
     try {

        //Verificar si el usuario existe
        const usuario = await Usuario.findOne({ id });
        if (!usuario) return res.status(400).json({ message: "Usuario no encontrado" });

        //Comprobar la contraseña
        const validPassword = await bcrypt.compare(password, usuario.password);
        if (!validPassword) return res.status(400).json({ message: "Contraseña incorrecta" });

        //Generar el token JWT
        const token = jwt.sign({ id: usuario.id, rol: usuario.rol }, JWT_SECRET, { expiresIn: '24h' });

        res.status(200).json({ message: 'Inicio de sesión exitoso', token });
        } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error en el server" });
        }
    }