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
import { empleadosReducer } from './store/empleados/empleados.reducers';
import { EmpleadosEffects } from './store/empleados/empleados.effects';
import { proyectosReducer } from './store/proyectos/proyectos.reducers';
import { ProyectosEffects } from './store/proyectos/proyectos.effects';
import { movimientoReducer } from './store/movimientos/movimiento.reducers';
import { MovimientoEffects } from './store/movimientos/movimiento.effects';
import { UsuariosEffects } from './store/usuarios/usuarios.effects';
import { usuariosReducer } from './store/usuarios/usuarios.reducers';


export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimationsAsync(), provideHttpClient(),
    provideStore({
      auth: authReducer,
      herramientas: herramientasReducer,
      empleados: empleadosReducer,
      proyectos: proyectosReducer,
      movimientos: movimientoReducer,
      usuarios: usuariosReducer
    }),
    provideEffects(
      [
        AuthEffects,
        HerramientasEffects,
        EmpleadosEffects,
        ProyectosEffects,
        MovimientoEffects,
        UsuariosEffects
      ]
    ),
    ...(isDevMode() ? [provideStoreDevtools()] : [])

  ],
};
