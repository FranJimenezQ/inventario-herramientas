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
  on(empleadosActions.crearEmpleadoSuccess, (state, { empleado }) => ({
    ...state,
    crear: {
      ...state.crear,
      loading: false,
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
  on(empleadosActions.actualizarEmpleadoSuccess, (state, { empleado }) => ({
    ...state,
    actualizar: {
      ...state.actualizar,
      loading: false,
      empleado
    }
  })),
  on(empleadosActions.actualizarEmpleadoFailure, (state, { error }) => ({
    ...state,
    actualizar: {
      ...state.actualizar,
      loading: false,
      error
    }
  })),
  //Eliminar empleado
  on(empleadosActions.eliminarEmpleado, (state, { idPersonal }) => ({
    ...state,
    empleados: state.empleados.filter(empleado => empleado._id !== idPersonal)
  })),
  on(empleadosActions.eliminarEmpleadoSuccess, (state) => ({
    ...state,
    eliminar: {
      loading: false,
      success: true,
      error: null
    }
  })),  on(empleadosActions.eliminarEmpleadoFailure, (state, { error }) => ({
    ...state,
    eliminar: {
      ...state.eliminar,
      loading: false,
      error
    }
  })),
);
