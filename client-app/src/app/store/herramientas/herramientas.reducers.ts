import { createReducer, on } from "@ngrx/store";
import { initialHerramientasState, HerramientasState } from "./herramientas.state";
import * as herramientasActions from './herramientas.actions';
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
  // on(herramientasActions.eliminarHerramienta, (state, { numeroSerie }) => ({
  //   ...state,
  //   eliminar: {
  //     ...state.eliminar,
  //     loading: true
  //   },
  //   herramientas: state.herramientas.filter(herramienta => herramienta.id !== id)
  // })),
  // on(herramientasActions.eliminarHerramientaSuccess, (state) => ({
  //   ...state,
  //   eliminar: {
  //     ...state.eliminar,
  //     loading: false,
  //     success: true
  //   }
  // })),
  // on(herramientasActions.eliminarHerramientaFailure, (state, { error }) => ({
  //   ...state,
  //   eliminar: {
  //     ...state.eliminar,
  //     loading: false,
  //     error
  //   }
  // }))
);
