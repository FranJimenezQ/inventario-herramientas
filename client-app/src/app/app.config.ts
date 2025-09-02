import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { authReducer } from './store/auth/auth.reducer';
import { provideEffects } from '@ngrx/effects';
import { AuthEffects } from './store/auth/auth.effects';
import { herramientasReducer } from './store/herramientas/herramientas.reducers';
import { HerramientasEffects } from './store/herramientas/herramientas.effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { isDevMode } from '@angular/core';


export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimationsAsync(), provideHttpClient(),
    provideStore({
      auth: authReducer,
      herramientas: herramientasReducer
    }),
    provideEffects(
      [
        AuthEffects,
        HerramientasEffects
      ]
    ),
    ...(isDevMode() ? [provideStoreDevtools()] : [])

  ],
};
