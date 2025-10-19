import { createSelector } from "@ngrx/store";
import { AuthState } from "./auth.state";

//crear un selector para obtener  el token del auth service, action, reducer
export const selectAuthState = (state: any) => state.auth;

export const selectToken = createSelector(
    selectAuthState,
    (state: AuthState) => state.token
);

//crear un selector para obtener el usuario logeado
export const selectUsuario = createSelector(
    selectAuthState,
    (state: AuthState) => state.usuario
);
