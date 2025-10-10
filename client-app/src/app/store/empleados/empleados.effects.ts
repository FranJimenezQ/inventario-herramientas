import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as empleadosActions from './empleados.actions';
import { EmpleadosService } from "../../services/empleados/empleados.service";
import { catchError, map, mergeMap, of } from "rxjs";
import { Empleado } from "./empleados.state";

@Injectable()
export class EmpleadosEffects {
  constructor(private actions$: Actions, private empleadosService: EmpleadosService) {}
// Efecto para cargar empleados
  cargarEmpleados$ = createEffect(() =>
    this.actions$.pipe(
      ofType(empleadosActions.cargarEmpleados),
      mergeMap(() =>
        this.empleadosService.obtenerEmpleados().pipe(
          map((empleados: Empleado[]) =>
            empleadosActions.cargarEmpleadosSuccess({ empleados })
          ),
          catchError((error) =>
            of(empleadosActions.cargarEmpleadosFailure({ error }))
          )
        )
      )
    )
  );
  //Efecto para crear un empleado
  crearEmpleado$ = createEffect(() =>
    this.actions$.pipe(
      ofType(empleadosActions.crearEmpleado),
      mergeMap(({ empleado }) =>
        this.empleadosService.crearEmpleado(empleado).pipe(
          map((response: any) =>
            empleadosActions.crearEmpleadoSuccess({mensaje: response.mensaje, empleado: response.empleado })
          ),
          catchError((error) =>
            of(empleadosActions.crearEmpleadoFailure({ error }))
          )
        )
      )
    )
  );

  //Efecto para actualizar un empleado
  actualizarEmpleado$ = createEffect(() =>
    this.actions$.pipe(
      ofType(empleadosActions.actualizarEmpleado),
      mergeMap(({ _id, empleado }) =>
        this.empleadosService.actualizarEmpleado(_id, empleado).pipe(
          map((response: any) =>
            empleadosActions.actualizarEmpleadoSuccess({ mensaje: response.mensaje, empleado: response.empleado})
          ),
          catchError((error) =>
            of(empleadosActions.actualizarEmpleadoFailure({ error }))
          )
        )
      )
    )
  );

  //Efecto para eliminar un empleado
  eliminarEmpleado$ = createEffect(() =>
    this.actions$.pipe(
      ofType(empleadosActions.eliminarEmpleado),
      mergeMap((action) =>
        this.empleadosService.eliminarEmpleado(action.empleadoId).pipe(
          map((response: any) =>
            empleadosActions.eliminarEmpleadoSuccess({ mensaje: response.mensaje, empleado: response.empleado})
          ),
          catchError((error) =>
            of(empleadosActions.eliminarEmpleadoFailure({ error: error?.error?.message || 'Error al eliminar empleado' }))
          )
        )
      )
    )
  );
}
