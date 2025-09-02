import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { login, loginSuccess, loginFailure, logout, logoutSuccess } from "./auth.actions";
import { of, map, catchError, mergeMap } from 'rxjs';
import { AuthService } from "../../services/authService/auth.service";
import { Router } from '@angular/router';


@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) { }


  // Login effect for user authentication
  loginEffect = createEffect(() => this.actions$.pipe(
    ofType(login),
    mergeMap(({ email, password }) =>
      this.authService.login({ email, password }).pipe(
        map(response => {
          const tokenExpiration = Date.now() + 60 * 60 * 1000;
          sessionStorage.setItem('token', response.token);
          sessionStorage.setItem('tokenExpiration', tokenExpiration.toString());
          return loginSuccess({ token: response.token, message: response.message });
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
      this.router.navigate(['/login']);

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

        return of(loginSuccess({ token, message: 'Token refreshed successfully' }));

      } else {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('tokenExpiration');
        return of(logout());
      }

    })
  ));

}
