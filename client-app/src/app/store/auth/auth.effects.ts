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
        mergeMap(({ userId, password }) =>
            this.authService.login({userId, password}).pipe(
                map(token => loginSuccess({ token })),
                catchError(error => of(loginFailure({ error: error.message })))
                )
            )
        )
    )

}        