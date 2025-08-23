import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { login, loginSuccess, loginFailure, logout, logoutSuccess } from "./auth.actions";
import { of, map, catchError, mergeMap } from 'rxjs';
import { AuthService } from "../../services/authService/auth.service";

@Injectable()
export class AuthEffects {
    constructor(
        private actions$: Actions,
        private authService: AuthService
    ) {}


    // Login effect for user authentication
    loginEffect = createEffect(() => this.actions$.pipe(
        ofType(login),
        mergeMap(({ email, password }) =>
            this.authService.login({ email, password }).pipe(
                map(token => {
                  const tokenExpiration = Date.now() + 60 * 60 * 1000;
                  sessionStorage.setItem('token', token);
                  sessionStorage.setItem('tokenExpiration', tokenExpiration.toString());
                  return loginSuccess({ token });
                }),
                catchError(error => of(loginFailure({ error: error.message })))
                )
            )
        )
    )

    // Logout effect for user authentication
    logoutEffect = createEffect(() => this.actions$.pipe(
        ofType(logout),
        mergeMap(() => {
            sessionStorage.removeItem('token');
            sessionStorage.removeItem('tokenExpiration');
            return of(logoutSuccess());
        })
    ));

    // Refresh token effect for user authentication
    refreshTokenEffect = createEffect(() => this.actions$.pipe(
        ofType('@ngrx/effects/init'),
        mergeMap(() => {
            const token = sessionStorage.getItem('token');
            const tokenExpiration = sessionStorage.getItem('tokenExpiration');

            if (token && tokenExpiration && Date.now() < +tokenExpiration) {

              return of(loginSuccess({token}));

            } else {
              sessionStorage.removeItem('token');
              sessionStorage.removeItem('tokenExpiration');
              return of(logout());
            }

        })
    ));

}
