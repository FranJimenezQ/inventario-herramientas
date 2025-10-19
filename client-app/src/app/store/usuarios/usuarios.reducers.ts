import { createReducer, on } from '@ngrx/store';
import { UsuariosState, Usuario } from './usuarios.state';
import * as UsuariosActions from './usuarios.actions';
// Estado inicial
import { initialUsuariosState } from './usuarios.state';

const initialState: UsuariosState = initialUsuariosState;

export const usuariosReducer = createReducer(
  // Estado inicial
  initialState,
  // reducers para manejar cargar usuarios
  on(UsuariosActions.cargarUsuarios, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(UsuariosActions.cargarUsuariosSuccess, (state, { usuarios }) => ({
    ...state,
    usuarios,
    loading: false,
    error: null
  })),
  on(UsuariosActions.cargarUsuariosFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  // reducers para manejar crear usuarios
  on(UsuariosActions.crearUsuario, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(UsuariosActions.crearUsuarioSuccess, (state, { mensaje, usuario }) => ({
    ...state,
    usuarios: [...state.usuarios, usuario],
    loading: false,
    error: null,
    mensaje
  })),
  on(UsuariosActions.crearUsuarioFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // reducers para manejar actualizar usuarios
  on(UsuariosActions.actualizarUsuario, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(UsuariosActions.actualizarUsuarioSuccess, (state, { mensaje, usuario }) => ({
    ...state,
    usuarios: state.usuarios.map(u => (u.id === usuario.id ? usuario : u)),
    loading: false,
    error: null,
    mensaje
  })),
  on(UsuariosActions.actualizarUsuarioFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // reducers para manejar eliminar usuarios
  on(UsuariosActions.eliminarUsuario, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(UsuariosActions.eliminarUsuarioSuccess, (state, { mensaje, _id }) => ({
    ...state,
    usuarios: state.usuarios.filter(u => u._id !== _id),
    loading: false,
    error: null,
    mensaje
  })),
  on(UsuariosActions.eliminarUsuarioFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // reducer para limpiar mensajes y errores
  on(UsuariosActions.limpiarUsuariosState, state => ({
    ...state,
    mensaje: null,
    error: null
  }))
);
