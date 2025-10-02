import  { createAction, props} from '@ngrx/store';
import { Empleado } from './empleados.state';

//Acciones para cargar la informacion de empleados (employees) obtenerEmpleados
export const cargarEmpleados = createAction('[Empleados] Cargar Empleados');
export const cargarEmpleadosSuccess = createAction(
  '[Empleados] Cargar Empleados Success',
  props<{ empleados: Empleado[] }>()
);
export const cargarEmpleadosFailure = createAction(
  '[Empleados] Cargar Empleados Failure',
  props<{ error: any }>()
);

//Acciones para crear un nuevo empleado
export const crearEmpleado = createAction(
  '[Empleados] Crear Empleado',
  props<{ empleado: Empleado }>()
);
export const crearEmpleadoSuccess = createAction(
  '[Empleados] Crear Empleado Success',
  props<{ mensaje: string; empleado: Empleado }>()
);
export const crearEmpleadoFailure = createAction(
  '[Empleados] Crear Empleado Failure',
  props<{ error: any }>()
);

//Acciones para actualizar un empleado
export const actualizarEmpleado = createAction(
  '[Empleados] Actualizar Empleado',
  props<{ id: string; empleado: Empleado }>()
);
export const actualizarEmpleadoSuccess = createAction(
  '[Empleados] Actualizar Empleado Success',
  props<{ empleado: Empleado }>()
);
export const actualizarEmpleadoFailure = createAction(
  '[Empleados] Actualizar Empleado Failure',
  props<{ error: any }>()
);

//Acciones para eliminar un empleado
export const eliminarEmpleado = createAction(
  '[Empleados] Eliminar Empleado',
  props<{ idPersonal: string }>()
);
export const eliminarEmpleadoSuccess = createAction(
  '[Empleados] Eliminar Empleado Success'
);
export const eliminarEmpleadoFailure = createAction(
  '[Empleados] Eliminar Empleado Failure',
  props<{ error: any }>()
);
