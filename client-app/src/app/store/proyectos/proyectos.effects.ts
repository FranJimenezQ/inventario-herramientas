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
          map((response: any) =>
            proyectosActions.crearProyectoSuccess({ proyecto: response.proyecto })
          ),
          catchError((error) =>
            of(proyectosActions.crearProyectoFailure({ error }))
          )
        )
      )
    )
  );

  //Efecto para actualizar un proyecto
  actualizarProyecto$ = createEffect(() =>
    this.actions$.pipe(
      ofType(proyectosActions.actualizarProyecto),
      mergeMap((action) =>
        this.proyectosService.actualizarProyecto(action.id, action.proyecto).pipe(
          map((response: any) =>
            proyectosActions.actualizarProyectoSuccess({  proyecto: response.proyecto, message: response.message })
          ),
          catchError((error) =>
            of(proyectosActions.actualizarProyectoFailure({ error }))
          )
        )
      )
    )
  );

  //Efecto para eliminar un proyecto
  eliminarProyecto$ = createEffect(() =>
    this.actions$.pipe(
      ofType(proyectosActions.eliminarProyecto),
      mergeMap((action) =>
        this.proyectosService.eliminarProyecto(action.proyectoId).pipe(
          map((response: any) =>
            proyectosActions.eliminarProyectoSuccess({ message: response.message, proyecto: response.proyecto })
          ),
          catchError((error) =>
            of(proyectosActions.eliminarProyectoFailure({ error }))
          )
        )
      )
    )
  );

  //Efecto para obtener herramientas por proyecto
  obtenerHerramientasPorProyecto$ = createEffect(() =>
    this.actions$.pipe(
      ofType(proyectosActions.obtenerHerramientasPorProyecto),
      mergeMap((action) =>
        this.proyectosService.obtenerHerramientasPorProyecto(action.proyectoId).pipe(
          map((response: any) =>
            proyectosActions.obtenerHerramientasPorProyectoSuccess({ herramientas: response.herramientas })
          ),
          catchError((error) =>
            of(proyectosActions.obtenerHerramientasPorProyectoFailure({ error }))
          )
        )
      )
    )
  );
}
