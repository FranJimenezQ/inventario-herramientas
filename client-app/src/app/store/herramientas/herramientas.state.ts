export interface Herramienta {
  nombre: string;
  marca: string;
  modelo: string;
  tipo: string;
  empleadoAsignado?: string;
  fechaSalida?: Date | null;
  fechaRegreso?: Date | null;
  proyectoAsignado?: string | null;
  numeroSerie: number;
  estado: string;
}

export interface HerramientasState {
  herramientas: Herramienta[];
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
  asignarProyecto: {
    loading: boolean;
    success: boolean;
    error: any;
  };
}

export const initialHerramientasState: HerramientasState = {
  herramientas: [],
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
  },
  asignarProyecto: {
    loading: false,
    success: false,
    error: null
  }
};
