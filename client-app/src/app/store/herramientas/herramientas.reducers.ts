import { createReducer, on } from "@ngrx/store";
import { initialHerramientasState, HerramientasState } from "./herramientas.state";
import * as herramientasActions from './herramientas.actions';
import { Herramienta } from './herramientas.state';
export const herramientasReducer = createReducer(
  initialHerramientasState,
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
  }))
);
