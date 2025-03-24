import { createReducer, on } from "@ngrx/store";
import { initialAuthState, AuthState } from "./auth.state";
import { login, loginSuccess, loginFailure } from "./auth.actions";

export const authReducer = createReducer(
    initialAuthState,
    on(login, (state) => ({...state, loading: true, error: null })),
    on(loginSuccess, (state, { token }) => ({...state, token, loading: false, error: null })),
    on(loginFailure, (state, { error }) => ({...state, loading: false, error })),
)