import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MovimientoState } from './movimiento.reducers';

export const selectMovimientoState = createFeatureSelector<MovimientoState>('movimiento');

export const selectAllMovimientos = createSelector(
  selectMovimientoState,
  (state: MovimientoState) => state.historial
);
export const selectMovimientoLoading = createSelector(
  selectMovimientoState,
  (state: MovimientoState) => state.loading
);
export const selectMovimientoError = createSelector(
  selectMovimientoState,
  (state: MovimientoState) => state.error
);
