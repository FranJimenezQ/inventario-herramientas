import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from "../../services/auth.service";
import { login, loginSuccess, loginFailure } from "./auth.actions";
import { of, map, catchError, mergeMap } from 'rxjs';

@Injectable()
export class AuthEffects {
    constructor(
        private actions$: Actions,
        private authService: AuthService
    ) {}

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

}
