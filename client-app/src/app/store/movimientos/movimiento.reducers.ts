import { createReducer, on } from '@ngrx/store';
import * as movimientosActions from './movimiento.actions';
import { Movimiento } from './movimiento.state';

export interface MovimientoState {
  historial: Movimiento[];
  loading: boolean;
  error: any;
}

export const initialState: MovimientoState = {
  historial: [],
  loading: false,
  error: null
};

export const movimientoReducer = createReducer(
  initialState,
  on(movimientosActions.cargarMovimientos, state => ({
    ...state,
    loading: true
  })),
  on(movimientosActions.cargarMovimientosSuccess, (state, { movimientos }) => ({
    ...state,
    loading: false,
    historial: movimientos
  })),
  on(movimientosActions.cargarMovimientosFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))
);
