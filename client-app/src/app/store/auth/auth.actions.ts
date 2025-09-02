import  { createAction, props} from '@ngrx/store';


// Login action for user authentication
export const login = createAction(
    '[Auth] Login',
    props<{ email: string; password: string }>()
);

export const loginSuccess = createAction(
    '[Auth] Login Success',
    props<{ token: string, message: string }>()
);

export const loginFailure = createAction(
    '[Auth] Login Failure',
    props<{ error: string }>()
);


// Logout action for user authentication
export const logout = createAction(
    '[Auth] Logout'
);

export const logoutSuccess = createAction(
    '[Auth] Logout Success'
);
