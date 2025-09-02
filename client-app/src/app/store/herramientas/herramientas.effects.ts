import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as herramientasActions from './herramientas.actions';
import { HerramientasService } from "../../services/herramientas/herramientas.service";
import { catchError, map, mergeMap, of } from "rxjs";
import { Herramienta } from "./herramientas.state";

@Injectable()
export class HerramientasEffects {

  constructor(private actions$: Actions, private herramientasService: HerramientasService) {}


// Efecto para cargar herramientas
  cargarHerramientas$ = createEffect(() =>
    this.actions$.pipe(
      ofType(herramientasActions.cargarHerramientas),
      // Llamada al servicio para cargar las herramientas
      mergeMap(() => this.herramientasService.getHerramientas()
        .pipe(
          map((herramientas: Herramienta[]) => herramientasActions.cargarHerramientasSuccess({ herramientas })),
          catchError(error => of(herramientasActions.cargarHerramientasFailure({ error })))
        )
      )
    )
  );

  //Efecto para crear una herramienta
  crearHerramienta$ = createEffect(() =>
    this.actions$.pipe(
      ofType(herramientasActions.crearHerramienta),
      mergeMap(action => this.herramientasService.crearHerramienta(action.herramienta)
        .pipe(
          map((response: any) => herramientasActions.crearHerramientaSuccess({ herramienta: response.herramienta })),
          catchError(error => of(herramientasActions.crearHerramientaFailure({ error })))
        )
      )
    )
  );

  //Efecto para eliminar una herramienta
  eliminarHerramienta$ = createEffect(() =>
    this.actions$.pipe(
      ofType(herramientasActions.eliminarHerramienta),
      mergeMap(action => this.herramientasService.eliminarHerramienta(action.herramienta.numeroSerie)
        .pipe(
          map(() => herramientasActions.eliminarHerramientaSuccess({ herramienta: action.herramienta })),
          catchError(error => of(herramientasActions.eliminarHerramientaFailure({ error })))
        )
      )
    )
  );

  //Efecto para actualizar una herramienta
    actualizarHerramienta$ = createEffect(() =>
      this.actions$.pipe(
        ofType(herramientasActions.actualizarHerramienta),
        mergeMap(action => this.herramientasService.actualizarHerramienta(action.id, action.herramienta)
          .pipe(
            map((herramienta: Herramienta) => herramientasActions.actualizarHerramientaSuccess({ herramienta })),
            catchError(error => of(herramientasActions.actualizarHerramientaFailure({ error })))
          )
        )
      )
    );

  //Efecto para devolver una herramienta
    devolverHerramienta$ = createEffect(() =>
      this.actions$.pipe(
        ofType(herramientasActions.devolverHerramienta),
        mergeMap(action => this.herramientasService.devolverHerramienta(action.herramientaId)
          .pipe(
            map((herramienta: Herramienta) => herramientasActions.devolverHerramientaSuccess({ herramienta })),
            catchError(error => of(herramientasActions.devolverHerramientaFailure({ error })))
          )
        )
      )
    );

}

