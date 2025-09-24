import  { createAction, props} from '@ngrx/store';
import { Proyecto } from './proyectos.states';

//Acciones para cargar la informacion de proyectos obtenerProyectos
export const cargarProyectos = createAction('[Proyectos] Cargar Proyectos');
export const cargarProyectosSuccess = createAction(
  '[Proyectos] Cargar Proyectos Success',
  props<{ proyectos: Proyecto[] }>()
);
export const cargarProyectosFailure = createAction(
  '[Proyectos] Cargar Proyectos Failure',
  props<{ error: any }>()
);

//Acciones para crear un nuevo proyecto
export const crearProyecto = createAction(
  '[Proyectos] Crear Proyecto',
  props<{ proyecto: Proyecto }>()
);
export const crearProyectoSuccess = createAction(
  '[Proyectos] Crear Proyecto Success',
  props<{ proyecto: Proyecto }>()
);
export const crearProyectoFailure = createAction(
  '[Proyectos] Crear Proyecto Failure',
  props<{ error: any }>()
);

//Acciones para actualizar un proyecto
export const actualizarProyecto = createAction(
  '[Proyectos] Actualizar Proyecto',
  props<{ id: string; proyecto: Proyecto }>()
);
export const actualizarProyectoSuccess = createAction(
  '[Proyectos] Actualizar Proyecto Success',
  props<{ proyecto: Proyecto, message: string }>()
);
export const actualizarProyectoFailure = createAction(
  '[Proyectos] Actualizar Proyecto Failure',
  props<{ error: any }>()
);

//Acciones para eliminar un proyecto
export const eliminarProyecto = createAction(
  '[Proyectos] Eliminar Proyecto',
  props<{ proyectoId: string }>()
);
export const eliminarProyectoSuccess = createAction(
  '[Proyectos] Eliminar Proyecto Success',
  props<{ message: string; proyecto: Proyecto }>()
);
export const eliminarProyectoFailure = createAction(
  '[Proyectos] Eliminar Proyecto Failure',
  props<{ error: any }>()
);
