import  { createAction, props} from '@ngrx/store';
import { Herramienta } from './herramientas.state';

//Acciones para cargar la informacion de herramientas (tools) obtenerHerramientas
export const cargarHerramientas = createAction('[Herramientas] Cargar Herramientas');

export const cargarHerramientasSuccess = createAction(
  '[Herramientas] Cargar Herramientas Success',
  props<{ herramientas: Herramienta[] }>()
);

export const cargarHerramientasFailure = createAction(
  '[Herramientas] Cargar Herramientas Failure',
  props<{ error: any }>()
);


//Acciones para crear una nueva herramienta
export const crearHerramienta = createAction(
  '[Herramientas] Crear Herramienta',
  props<{ herramienta: Herramienta }>()
);

export const crearHerramientaSuccess = createAction(
  '[Herramientas] Crear Herramienta Success',
  props<{ herramienta: Herramienta }>()
);

export const crearHerramientaFailure = createAction(
  '[Herramientas] Crear Herramienta Failure',
  props<{ error: any }>()
);

//Acciones para actualizar una herramienta
export const actualizarHerramienta = createAction(
  '[Herramientas] Actualizar Herramienta',
  props<{ id: string; herramienta: Herramienta }>()
);

export const actualizarHerramientaSuccess = createAction(
  '[Herramientas] Actualizar Herramienta Success',
  props<{ herramienta: Herramienta }>()
);

export const actualizarHerramientaFailure = createAction(
  '[Herramientas] Actualizar Herramienta Failure',
  props<{ error: any }>()
);


//Acciones para eliminar una herramienta
export const eliminarHerramienta = createAction(
  '[Herramientas] Eliminar Herramienta',
  props<{ herramienta: Herramienta }>()
);

export const eliminarHerramientaSuccess = createAction(
  '[Herramientas] Eliminar Herramienta Success',
  props<{ herramienta: Herramienta }>()
);

export const eliminarHerramientaFailure = createAction(
  '[Herramientas] Eliminar Herramienta Failure',
  props<{ error: any }>()
);


//Acciones para asignarHerramienta a un proyecto
export const asignarHerramienta = createAction(
  '[Herramientas] Asignar Herramienta',
  props<{ herramienta: Herramienta }>()
);

export const asignarHerramientaSuccess = createAction(
  '[Herramientas] Asignar Herramienta Success',
  props<{ herramienta: Herramienta }>()
);

export const asignarHerramientaFailure = createAction(
  '[Herramientas] Asignar Herramienta Failure',
  props<{ error: any }>()
);


//Acciones para obtenerHerramientaPorId
export const obtenerHerramientaPorId = createAction(
  '[Herramientas] Obtener Herramienta Por Id',
  props<{ id: string }>()
);

export const obtenerHerramientaPorIdSuccess = createAction(
  '[Herramientas] Obtener Herramienta Por Id Success',
  props<{ herramienta: Herramienta }>()
);

export const obtenerHerramientaPorIdFailure = createAction(
  '[Herramientas] Obtener Herramienta Por Id Failure',
  props<{ error: any }>()
);

//Acciones para obtenerHerramientasPorProyecto
export const obtenerHerramientasPorProyecto = createAction(
  '[Herramientas] Obtener Herramientas Por Proyecto',
  props<{ proyectoId: string }>()
);

export const obtenerHerramientasPorProyectoSuccess = createAction(
  '[Herramientas] Obtener Herramientas Por Proyecto Success',
  props<{ herramientas: Herramienta[] }>()
);

export const obtenerHerramientasPorProyectoFailure = createAction(
  '[Herramientas] Obtener Herramientas Por Proyecto Failure',
  props<{ error: any }>()
);

//Acciones para movimiento obtenerHistorialPorHerramienta
export const obtenerHistorialPorHerramienta = createAction(
  '[Herramientas] Obtener Historial Por Herramienta',
  props<{ herramientaId: string }>()
);

export const obtenerHistorialPorHerramientaSuccess = createAction(
  '[Herramientas] Obtener Historial Por Herramienta Success',
  props<{ historial: any[] }>()
);

export const obtenerHistorialPorHerramientaFailure = createAction(
  '[Herramientas] Obtener Historial Por Herramienta Failure',
  props<{ error: any }>()
);

//Acciones para devolverHerramienta
export const devolverHerramienta = createAction(
  '[Herramientas] Devolver Herramienta',
  props<{ herramientaId: string }>()
);

export const devolverHerramientaSuccess = createAction(
  '[Herramientas] Devolver Herramienta Success',
  props<{ herramienta: Herramienta }>()
);

export const devolverHerramientaFailure = createAction(
  '[Herramientas] Devolver Herramienta Failure',
  props<{ error: any }>()
);
