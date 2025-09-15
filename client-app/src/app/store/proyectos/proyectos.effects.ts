import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as proyectosActions from './proyectos.actions';
import { ProyectosService } from "../../services/proyectos/proyectos.service";
import { catchError, map, mergeMap, of } from "rxjs";
import { Proyecto } from "./proyectos.states";

@Injectable()
export class ProyectosEffects {
  constructor(private actions$: Actions, private proyectosService: ProyectosService) {}

// Efecto para cargar proyectos
  cargarProyectos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(proyectosActions.cargarProyectos),
      mergeMap(() =>
        this.proyectosService.obtenerProyectos().pipe(
          map((proyectos: Proyecto[]) =>
            proyectosActions.cargarProyectosSuccess({ proyectos })
          ),
          catchError((error) =>
            of(proyectosActions.cargarProyectosFailure({ error }))
          )
        )
      )
    )
  );

  //Efecto para crear un proyecto
  crearProyecto$ = createEffect(() =>
    this.actions$.pipe(
      ofType(proyectosActions.crearProyecto),
      mergeMap((action) =>
        this.proyectosService.crearProyecto(action.proyecto).pipe(
          map((proyecto: Proyecto) =>
            proyectosActions.crearProyectoSuccess({ proyecto })
          ),
          catchError((error) =>
            of(proyectosActions.crearProyectoFailure({ error }))
          )
        )
      )
    )
  );
}
