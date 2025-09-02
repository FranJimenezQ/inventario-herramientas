export interface AuthState {
    token: string | null;
    loading: boolean;
    error: string | null;
    message: string | null;
}

export const initialAuthState: AuthState = {
    token: null,
    loading: false,
    error: null,
    message: null
};
