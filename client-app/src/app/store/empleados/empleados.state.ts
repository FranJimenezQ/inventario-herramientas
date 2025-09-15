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
  };
  actualizar: {
    loading: boolean;
    success: boolean;
    error: any;
  };
  eliminar: {
    loading: boolean;
    success: boolean;
    error: any;
  };
}
export const initialEmpleadosState: EmpleadosState = {
  empleados: [],
  loading: false,
  error: null,
  crear: {
    loading: false,
    success: false,
    error: null
  },
  actualizar: {
    loading: false,
    success: false,
    error: null
  },
  eliminar: {
    loading: false,
    success: false,
    error: null
  }
};
