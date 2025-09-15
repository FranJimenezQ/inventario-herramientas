import { createReducer, on } from "@ngrx/store";
import { initialProyectosState } from "./proyectos.states";
import * as ProyectosActions from './proyectos.actions';


export const proyectosReducer = createReducer(
  initialProyectosState,
  //Cargar proyectos
  on(ProyectosActions.cargarProyectos, state => ({
    ...state,
  })),
  on(ProyectosActions.cargarProyectosSuccess, (state, { proyectos }) => ({
    ...state,
    proyectos
  })),
  on(ProyectosActions.cargarProyectosFailure, (state, { error }) => ({
    ...state,
    error
  })),

  //Crear proyecto
  on(ProyectosActions.crearProyecto, state => ({
    ...state,
  })),
  on(ProyectosActions.crearProyectoSuccess, (state, { proyecto }) => ({
    ...state,
    proyectos: [...state.proyectos, proyecto]
  })),
  on(ProyectosActions.crearProyectoFailure, (state, { error }) => ({
    ...state,
    error
  })),


);
