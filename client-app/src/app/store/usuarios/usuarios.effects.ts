import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { AppState } from "../appState";
import { UsuariosService } from "../../services/usuarios.service";
import * as usuariosActions from './usuarios.actions';
import { catchError, map, mergeMap, of } from "rxjs";
import { Usuario } from "./usuarios.state";

@Injectable()
export class UsuariosEffects {
    constructor(
        private actions$: Actions,
        private usuariosService: UsuariosService,
        private store: Store<AppState>
    ) {}
    cargarUsuarios$ = createEffect(() =>
        this.actions$.pipe(
            ofType(usuariosActions.cargarUsuarios),
            mergeMap(() =>
                this.usuariosService.obtenerUsuarios().pipe(
                    map((usuarios: Usuario[]) => usuariosActions.cargarUsuariosSuccess({ usuarios })),
                    catchError(error => of(usuariosActions.cargarUsuariosFailure({ error })))
                )
            )
        )
    );

    crearUsuario$ = createEffect(() =>
        this.actions$.pipe(
            ofType(usuariosActions.crearUsuario),
            mergeMap(action =>
                this.usuariosService.registrarUsuario(action.usuario).pipe(
                    map((response: any) => usuariosActions.crearUsuarioSuccess({ mensaje: response.mensaje, usuario: response.usuario })),
                    catchError(error => of(usuariosActions.crearUsuarioFailure({ error })))
                )
            )
        )
    );

    actualizarUsuario$ = createEffect(() =>
        this.actions$.pipe(
            ofType(usuariosActions.actualizarUsuario),
            mergeMap(action =>
                this.usuariosService.actualizarUsuario(action._id, action.usuario).pipe(
                    map((response: any) => usuariosActions.actualizarUsuarioSuccess({ mensaje: response.mensaje, usuario: response.usuario })),
                    catchError(error => of(usuariosActions.actualizarUsuarioFailure({ error })))
                )
            )
        )
    );

    eliminarUsuario$ = createEffect(() =>
        this.actions$.pipe(
            ofType(usuariosActions.eliminarUsuario),
            mergeMap(action =>
                this.usuariosService.eliminarUsuario(action._id).pipe(
                    map((response: any) => usuariosActions.eliminarUsuarioSuccess({ mensaje: response.mensaje, _id: action._id })),
                    catchError(error => of(usuariosActions.eliminarUsuarioFailure({ error })))
                )
            )
        )
    );

}
