export interface Empleado {
  _id: string;
  idPersonal: string;
  nombre: string;
  apellido: string;
  cargo: string;
}

export interface EmpleadosState {
  empleados: Empleado[];
  loading: boolean;
  error: string | null;
  crear: {
    loading: boolean;
    success: boolean;
    error: any;
    mensaje?: string | null;
    empleado?: Empleado | null;
  };
  actualizar: {
    loading: boolean;
    success: boolean;
    error: any;
    mensaje?: string | null;
    empleado?: Empleado | null;
  };
  eliminar: {
    loading: boolean;
    success: boolean;
    error: any;
    mensaje?: string | null;
    empleado?: Empleado | null;
  };
}
export const initialEmpleadosState: EmpleadosState = {
  empleados: [],
  loading: false,
  error: null,
  crear: {
    loading: false,
    success: false,
    error: null,
    mensaje: null,
    empleado: null
  },
  actualizar: {
    loading: false,
    success: false,
    error: null,
    mensaje: null,
    empleado: null
  },
  eliminar: {
    loading: false,
    success: false,
    error: null
  }
};
