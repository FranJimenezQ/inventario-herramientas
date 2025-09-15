import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as movimientoActions from './movimiento.actions';
import { Movimiento } from './movimiento.state';
import { MovimientosService } from '../../services/movimiento/movimientos.service';
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable()
export class MovimientoEffects {
  constructor(
    private actions$: Actions,
    private movimientosService: MovimientosService
  ) {}

  //Efecto para cargar todos los movimientos
  cargarMovimientos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(movimientoActions.cargarMovimientos),
      mergeMap(() =>
        this.movimientosService.obtenerHistorialPorHerramienta('herramientaId').pipe(
          map(movimientos => movimientoActions.cargarMovimientosSuccess({ movimientos })),
          catchError(error => of(movimientoActions.cargarMovimientosFailure({ error })))
        )
      )
    )
  );

  //Efecto para cargar el historial de movimientos por herramienta
  cargarHistorialPorHerramienta$ = createEffect(() =>
    this.actions$.pipe(
      ofType(movimientoActions.cargarHistorialPorHerramienta),
      mergeMap(action =>
        this.movimientosService.obtenerHistorialPorHerramienta(action.herramientaId).pipe(
          map(movimientos => movimientoActions.cargarHistorialPorHerramientaSuccess({ movimientos })),
          catchError(error => of(movimientoActions.cargarHistorialPorHerramientaFailure({ error })))
        )
      )
    )
  );

  //Effeecto para devolver una herramienta
  devolverHerramienta$ = createEffect(() =>
    this.actions$.pipe(
      ofType(movimientoActions.devolverHerramienta),
      mergeMap(action =>
        this.movimientosService.devolverHerramienta(
          action.herramientaId,
          action.fechaDevolucion,
          action.estado,
          action.empleadoAsignado,
          action.proyectoAsignado
        ).pipe(
          map(( response: any) => movimientoActions.devolverHerramientaSuccess({ movimiento: response.movimiento, herramienta: response.herramienta })),
          catchError(error => of(movimientoActions.devolverHerramientaFailure({ error })))
        )
      )
    )
  );
}
