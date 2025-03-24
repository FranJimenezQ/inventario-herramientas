import { createSelector } from "@ngrx/store";

//crerar la interface
export interface AuthState {
    token: string | null;
    loading: boolean;
    error: string | null;
}
//crear un selector para obtener  el token del auth service, action, reducer
export const selectAuthState = (state: any) => state.auth;

export const selectToken = createSelector(
    selectAuthState,
    (state: AuthState) => state.token
);