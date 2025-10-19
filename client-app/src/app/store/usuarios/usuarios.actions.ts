import { createAction, props } from '@ngrx/store';
import { Usuario } from './usuarios.state';
// Acciones para cargar todas los usuarios
export const cargarUsuarios = createAction('[Usuarios] Cargar Usuarios');

export const cargarUsuariosSuccess = createAction(
  '[Usuarios] Cargar Usuarios Success',
  props<{ usuarios: Usuario[] }>()
);
export const cargarUsuariosFailure = createAction(
  '[Usuarios] Cargar Usuarios Failure',
  props<{ error: any }>()
);

// Acciones para crear un nuevo usuario
export const crearUsuario = createAction(
  '[Usuarios] Crear Usuario',
  props<{ usuario: Usuario }>()
);
export const crearUsuarioSuccess = createAction(
  '[Usuarios] Crear Usuario Success',
  props<{ mensaje: string; usuario: Usuario }>()
);
export const crearUsuarioFailure = createAction(
  '[Usuarios] Crear Usuario Failure',
  props<{ error: any }>()
);

// Acciones para actualizar un usuario
export const actualizarUsuario = createAction(
  '[Usuarios] Actualizar Usuario',
  props<{ _id: string; usuario: Usuario }>()
);
export const actualizarUsuarioSuccess = createAction(
  '[Usuarios] Actualizar Usuario Success',
  props<{ mensaje: string; usuario: Usuario }>()
);
export const actualizarUsuarioFailure = createAction(
  '[Usuarios] Actualizar Usuario Failure',
  props<{ error: any }>()
);

// Acciones para eliminar un usuario
export const eliminarUsuario = createAction(
  '[Usuarios] Eliminar Usuario',
  props<{ _id: string }>()
);
export const eliminarUsuarioSuccess = createAction(
  '[Usuarios] Eliminar Usuario Success',
  props<{ mensaje: string; _id: string }>()
);
export const eliminarUsuarioFailure = createAction(
  '[Usuarios] Eliminar Usuario Failure',
  props<{ error: any }>()
);
// Acción para limpiar mensajes y errores
export const limpiarUsuariosState = createAction('[Usuarios] Limpiar Usuarios State');
