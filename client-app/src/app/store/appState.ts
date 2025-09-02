import { HerramientasState } from "./herramientas/herramientas.state";
import { AuthState } from "./auth/auth.state";

export interface AppState {
  herramientas: HerramientasState;
  auth: AuthState;
}
