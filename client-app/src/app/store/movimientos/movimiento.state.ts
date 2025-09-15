import { EmpleadoAsignado, ProyectoAsignado } from "../herramientas/herramientas.state";

export interface Movimiento {
  _id: string;
  herramientaId: string;
  proyectoId: ProyectoAsignado | null;
  empleadoSolicitante: EmpleadoAsignado | null;
  fechaDePrestamo: Date;
  fechaDevolucion?: Date | null;
}

export interface MovimientosState {
  movimientos: Movimiento[];
  loading: boolean;
  error: any;
}

export const initialMovimientosState: MovimientosState = {
  movimientos: [],
  loading: false,
  error: null
};



