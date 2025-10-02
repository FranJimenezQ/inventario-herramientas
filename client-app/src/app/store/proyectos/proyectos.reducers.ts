import { createReducer, on } from "@ngrx/store";
import { initialProyectosState } from "./proyectos.states";
import * as ProyectosActions from './proyectos.actions';


export const proyectosReducer = createReducer(
  initialProyectosState,
  //Cargar proyectos
  on(ProyectosActions.cargarProyectos, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(ProyectosActions.cargarProyectosSuccess, (state, { proyectos }) => ({
    ...state,
    proyectos,
    loading: false,
    error: null
  })),
  on(ProyectosActions.cargarProyectosFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  //Crear proyecto
  on(ProyectosActions.crearProyecto, state => ({
    ...state,
    crear: {
      loading: true,
      success: false,
      error: null
    }
  })),
  on(ProyectosActions.crearProyectoSuccess, (state, { proyecto }) => ({
    ...state,
    proyectos: [...state.proyectos, proyecto],
    crear: {
      ...state.crear,
      loading: false,
      success: true,
      error: null
    }
  })),
  on(ProyectosActions.crearProyectoFailure, (state, { error }) => ({
    ...state,
    crear: {
      ...state.crear,
      loading: false,
      success: false,
      error
    }
  })),

  //Actualizar proyecto
  on(ProyectosActions.actualizarProyecto, state => ({
    ...state,
    actualizar: {
      loading: true,
      success: false,
      error: null
    }
  })),
  on(ProyectosActions.actualizarProyectoSuccess, (state, { proyecto, message }) => ({
    ...state,
    proyectos: state.proyectos.map(p => p._id === proyecto._id ? proyecto : p),
    actualizar: {
      ...state.actualizar,
      loading: false,
      success: true,
      error: null,
      message: message

    }
  })),
  on(ProyectosActions.actualizarProyectoFailure, (state, { error }) => ({
    ...state,
    actualizar: {
      ...state.actualizar,
      loading: false,
      success: false,
      error
    }
  })),
  //Eliminar proyecto
  on(ProyectosActions.eliminarProyecto, state => ({
    ...state,
    eliminar: {
      loading: true,
      success: false,
      error: null
    }
  })),
  on(ProyectosActions.eliminarProyectoSuccess, (state, { message, proyecto }) => ({
    ...state,
    proyectos: state.proyectos.filter(p => p._id !== proyecto._id),
    eliminar: {
      ...state.eliminar,
      loading: false,
      success: true,
      message: message,
      error: null
    }
  })),
  on(ProyectosActions.eliminarProyectoFailure, (state, { error }) => ({
    ...state,
    eliminar: {
      ...state.eliminar,
      loading: false,
      success: false,
      error
    }
  })),
  //Obtener herramientas por proyecto
  on(ProyectosActions.obtenerHerramientasPorProyecto, state => ({
    ...state,
    herramientas: {
      loading: true,
      herramientas: [],
      error: null
    }
  })),
  on(ProyectosActions.obtenerHerramientasPorProyectoSuccess, (state, { herramientas }) => ({
    ...state,
    herramientas: {
      loading: false,
      herramientas,
      error: null
    }
  })),
  on(ProyectosActions.obtenerHerramientasPorProyectoFailure, (state, { error }) => ({
    ...state,
    herramientas: {
      loading: false,
      herramientas: [],
      error
    }
  }))
);
