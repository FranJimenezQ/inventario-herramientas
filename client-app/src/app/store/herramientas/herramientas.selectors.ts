import { createSelector } from "@ngrx/store";
import { HerramientasState } from "./herramientas.state";

export const selectHerramientasState = (state: { herramientas: HerramientasState }) => state.herramientas;

//Selectores para obtener todas las herramientas en base de datos
export const selectTodasHerramientas = createSelector(
  selectHerramientasState,
  (state: HerramientasState) => state.herramientas
);

export const selectHerramientasLoading = createSelector(
  selectHerramientasState,
  (state: HerramientasState) => state.loading
);

export const selectHerramientasError = createSelector(
  selectHerramientasState,
  (state: HerramientasState) => state.error
);

//Selectores para las herramienta nueva creada
export const selectCrearHerramientaLoading = createSelector(
  selectHerramientasState,
  (state: HerramientasState) => state.crear.loading
);

export const selectCrearHerramientaSuccess = createSelector(
  selectHerramientasState,
  (state: HerramientasState) => state.crear.success
);

export const selectCrearHerramientaError = createSelector(
  selectHerramientasState,
  (state: HerramientasState) => state.crear.error
);
