export interface Herramienta {
  id: string;
  nombre: string;
  marca: string;
  modelo: string;
  tipo: string;
  empleadoAsignado: string;
  fechaSalida: Date | null;
  fechaRegreso: Date | null;
  proyectoAsignado: string | null;
  numeroSerie: number;
}

export interface HerramientasState {
  herramientas: Herramienta[];
  loading: boolean;
  error: any;
}

export const initialHerramientasState: HerramientasState = {
  herramientas: [],
  loading: false,
  error: null
};
