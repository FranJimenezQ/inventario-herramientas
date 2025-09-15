import { HerramientasState } from "./herramientas/herramientas.state";
import { AuthState } from "./auth/auth.state";
import { ProyectosState } from "./proyectos/proyectos.states";
import { EmpleadosState } from "./empleados/empleados.state";

export interface AppState {
  herramientas: HerramientasState;
  auth: AuthState;
  proyectos: ProyectosState;
  empleados: EmpleadosState;
}
