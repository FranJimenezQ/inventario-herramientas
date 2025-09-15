import { createAction, props } from '@ngrx/store';
import { Movimiento } from './movimiento.state';
import { Herramienta } from '../herramientas/herramientas.state';

//Acciones para cargar la informacion de movimientos (movimientos) obtenerMovimientos
export const cargarMovimientos = createAction('[Movimientos] Cargar Movimientos');

export const cargarMovimientosSuccess = createAction(
  '[Movimientos] Cargar Movimientos Success',
  props<{ movimientos: Movimiento[] }>()
);
export const cargarMovimientosFailure = createAction(
  '[Movimientos] Cargar Movimientos Failure',
  props<{ error: any }>()
);

//Acciones para cargar el historial de movimientos por herramienta
export const cargarHistorialPorHerramienta = createAction(
  '[Movimientos] Cargar Historial Por Herramienta',
  props<{ herramientaId: string }>()
);
export const cargarHistorialPorHerramientaSuccess = createAction(
  '[Movimientos] Cargar Historial Por Herramienta Success',
  props<{ movimientos: Movimiento[] }>()
);
export const cargarHistorialPorHerramientaFailure = createAction(
  '[Movimientos] Cargar Historial Por Herramienta Failure',
  props<{ error: any }>()
);


//Acciones para devolver una herramienta
export const devolverHerramienta = createAction(
  '[Movimientos] Devolver Herramienta',
  props<{ herramientaId: string; fechaDevolucion: string; estado: string, empleadoAsignado: string | null, proyectoAsignado: string | null }>()
);
export const devolverHerramientaSuccess = createAction(
  '[Movimientos] Devolver Herramienta Success',
  props<{ movimiento: Movimiento, herramienta: Herramienta }>()
);
export const devolverHerramientaFailure = createAction(
  '[Movimientos] Devolver Herramienta Failure',
  props<{ error: any }>()
);
