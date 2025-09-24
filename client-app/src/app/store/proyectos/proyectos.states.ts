export interface Proyecto {
  _id: string;
  nombre: string;
  numeroProyecto: string;
  direccion: string;
}
export interface ProyectosState {
  proyectos: Proyecto[];
  loading: boolean;
  error: any;
    crear: {
    loading: boolean;
    success: boolean;
    error: any;
    message?: string;
  };
  actualizar: {
    loading: boolean;
    success: boolean;
    error: any;
    message?: string;
  };
  eliminar: {
    loading: boolean;
    success: boolean;
    error: any;
    message?: string;
  };
}

export const initialProyectosState: ProyectosState = {
  proyectos: [],
  loading: false,
  error: null,
  crear: {
    loading: false,
    success: false,
    error: null,
    message: ''
  },
  actualizar: {
    loading: false,
    success: false,
    error: null,
    message: ''
  },
  eliminar: {
    loading: false,
    success: false,
    error: null,
    message: ''
  }
};
