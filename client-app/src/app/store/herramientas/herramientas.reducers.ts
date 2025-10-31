import { createReducer, on } from "@ngrx/store";
import { initialHerramientasState, HerramientasState } from "./herramientas.state";
import * as herramientasActions from './herramientas.actions';
import * as movimientoActions from '../movimientos/movimiento.actions';
import { Herramienta } from './herramientas.state';


export const herramientasReducer = createReducer(
  initialHerramientasState,
  //Cargar herramientas
  on(herramientasActions.cargarHerramientas, state => ({
    ...state,
    loading: true
  })),
  on(herramientasActions.cargarHerramientasSuccess, (state, { herramientas }) => ({
    ...state,
    loading: false,
    herramientas
  })),
  on(herramientasActions.cargarHerramientasFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  //Crear herramienta
  on(herramientasActions.crearHerramienta, state => ({
    ...state,
    crear: {
      ...state.crear,
      loading: true
    }
  })),
  on(herramientasActions.crearHerramientaSuccess, (state, { herramienta }) => ({
    ...state,
    crear: {
      ...state.crear,
      loading: false,
      success: true
    },
    herramientas: [...state.herramientas, herramienta]
  })),
  on(herramientasActions.crearHerramientaFailure, (state, { error }) => ({
    ...state,
    crear: {
      ...state.crear,
      loading: false,
      error
    }
  })),
  //Eliminar herramienta
  on(herramientasActions.eliminarHerramienta, (state) => ({
    ...state,
    eliminar: { ...state.eliminar,  loading: true, success: false, error: null }
  })),
  on(herramientasActions.eliminarHerramientaSuccess, (state, { _id }) => ({
    ...state,
    herramientas: state.herramientas.filter(herramienta => herramienta._id !== _id),
    eliminar: { ...state.eliminar, loading: false, success: true }
  })),
  on(herramientasActions.eliminarHerramientaFailure, (state, { error }) => ({
    ...state,
    eliminar: { ...state.eliminar, loading: false, error}
  })),

  //Actualizar herramienta
  on(herramientasActions.actualizarHerramienta, (state) => ({
    ...state,
    actualizar: { ...state.actualizar, loading: true, success: false, error: null }
  })),
  on(herramientasActions.actualizarHerramientaSuccess, (state, { herramienta }) => ({
    ...state,
    herramientas: state.herramientas.map(h => h._id === herramienta._id ? herramienta : h),
    actualizar: { ...state.actualizar, loading: false, success: true }
  })),
  on(herramientasActions.actualizarHerramientaFailure, (state, { error }) => ({
    ...state,
    actualizar: { ...state.actualizar, loading: false, error }
  })),

//Asignar un proyecto y empleado a una herramienta
  on(herramientasActions.asignarHerramienta, (state) => ({
    ...state,
    asignarProyecto: { ...state.asignarProyecto, loading: true, success: false, error: null }
  })),
  on(herramientasActions.asignarHerramientaSuccess, (state, { herramienta }) => ({
    ...state,
    herramientas: state.herramientas.map(h => h._id === herramienta._id ? herramienta : h),
    asignarProyecto: { ...state.asignarProyecto, loading: false, success: true }
  })),
  on(herramientasActions.asignarHerramientaFailure, (state, { error }) => ({
    ...state,
    asignarProyecto: { ...state.asignarProyecto, loading: false, error }
  })),

  //Devolver herramienta
on(movimientoActions.devolverHerramientaSuccess, (state, { herramienta }) => ({
    ...state,
    herramientas: state.herramientas.map(h =>
      h._id === herramienta._id ? herramienta : h
    )
  })),
  on(movimientoActions.devolverHerramientaFailure, (state, { error }) => ({
    ...state,
    error
  })),

  //Limpiar el estado de success y error al crear herramienta
  on(herramientasActions.limpiarEstadoCrearHerramienta, (state) => ({
    ...state,
    crear: {
      ...state.crear,
      success: false,
      error: null
    }
  })),

  //Limpiar el estado de success y error al actualizar herramienta
  on(herramientasActions.limpiarEstadoActualizarHerramienta, (state) => ({
    ...state,
    actualizar: {
      ...state.actualizar,
      success: false,
      error: null
    }
  })),

  //Limpiar el estado de success y error al eliminar herramienta
  on(herramientasActions.limpiarEstadoEliminarHerramienta, (state) => ({
    ...state,
    eliminar: {
      ...state.eliminar,
      success: false,
      error: null
    }
  }))
);

