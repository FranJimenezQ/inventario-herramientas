import { createReducer, on } from "@ngrx/store";
import { initialEmpleadosState } from "./empleados.state";
import * as empleadosActions from './empleados.actions';

export const empleadosReducer = createReducer(
  initialEmpleadosState,
  //Cargar empleados
  on(empleadosActions.cargarEmpleados, state => ({
    ...state,
    loading: true
  })),
  on(empleadosActions.cargarEmpleadosSuccess, (state, { empleados }) => ({
    ...state,
    loading: false,
    empleados
  })),
  on(empleadosActions.cargarEmpleadosFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  //Crear empleado
  on(empleadosActions.crearEmpleado, state => ({
    ...state,
    crear: {
      ...state.crear,
      loading: true
    }
  })),
  on(empleadosActions.crearEmpleadoSuccess, (state, { mensaje, empleado }) => ({
    ...state,
    empleados: [...state.empleados, empleado],
    crear: {
      ...state.crear,
      loading: false,
      success: true,
      error: null,
      mensaje,
      empleado
    }
  })),
  on(empleadosActions.crearEmpleadoFailure, (state, { error }) => ({
    ...state,
    crear: {
      ...state.crear,
      loading: false,
      error
    }
  })),
  //Actualizar empleado
  on(empleadosActions.actualizarEmpleado, state => ({
    ...state,
    actualizar: {
      ...state.actualizar,
      loading: true
    }
  })),
  on(empleadosActions.actualizarEmpleadoSuccess, (state, { mensaje, empleado }) => ({
    ...state,
    empleados: state.empleados.map(emp => emp._id === empleado._id ? empleado : emp),
    actualizar: {
      ...state.actualizar,
      loading: false,
      success: true,
      error: null,
      mensaje,
      empleado
    }
  })),
  on(empleadosActions.actualizarEmpleadoFailure, (state, { error }) => ({
    ...state,
    actualizar: {
      ...state.actualizar,
      loading: false,
      error: true
    }
  })),


  //Eliminar empleado
  on(empleadosActions.eliminarEmpleado, (state) => ({
    ...state,
    eliminar: {
      loading: true,
      success: false,
      error: null

    }
  })),
  on(empleadosActions.eliminarEmpleadoSuccess, (state, { mensaje, empleado }) => ({
    ...state,
    empleados: state.empleados.filter(emp => emp._id !== empleado._id),
    eliminar: {
      loading: false,
      success: true,
      mensaje,
      error: null,
      empleado

    }
  })),  on(empleadosActions.eliminarEmpleadoFailure, (state, { error }) => ({
    ...state,
    eliminar: {
      ...state.eliminar,
      loading: false,
      success: false,
      mensaje: error,
      error: true
    }
  })),
);
