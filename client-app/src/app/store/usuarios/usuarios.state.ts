export interface Usuario {
  _id?: string;
  nombre: string;
  apellido: string;
  email: string;
  id: string;
  rol: 'ADMIN' | 'TECNICO' | 'EMPLEADO';
  password?: string;
}

export interface UsuariosState {
  usuarios: Usuario[];
  loading: boolean;
  error: string | null;
    crear: {
      loading: boolean;
      success: boolean;
      error: any;
      mensaje?: string | null;
      usuario?: Usuario | null;
    };
    actualizar: {
      loading: boolean;
      success: boolean;
      error: any;
      mensaje?: string | null;
      usuario?: Usuario | null;
    };
    eliminar: {
      loading: boolean;
      success: boolean;
      error: any;
      mensaje?: string | null;
      usuario?: Usuario | null;
    };
}
export const initialUsuariosState: UsuariosState = {
  usuarios: [],
  loading: false,
  error: null,
    crear: {
      loading: false,
      success: false,
      error: null,
      mensaje: null,
      usuario: null
    },
    actualizar: {
      loading: false,
      success: false,
      error: null,
      mensaje: null,
      usuario: null
    },
    eliminar: {
      loading: false,
      success: false,
      error: null,
      mensaje: null,
      usuario: null
    },
};
