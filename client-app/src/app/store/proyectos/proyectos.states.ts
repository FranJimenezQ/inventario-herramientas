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

export const initialProyectosState: ProyectosState = {
  proyectos: [],
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
