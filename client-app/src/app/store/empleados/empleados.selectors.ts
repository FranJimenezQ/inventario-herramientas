import { createSelector } from "@ngrx/store";
import { EmpleadosState } from "./empleados.state";

// Selector para el estado de empleados
export const selectEmpleadosState = (state: { empleados: EmpleadosState }) => state.empleados;

// Selector para obtener todos los empleados
export const selectObtenerEmpleados = createSelector(
  selectEmpleadosState,
  (state: EmpleadosState) => state.empleados
);
export const selectEmpleadosLoading = createSelector(
  selectEmpleadosState,
  (state: EmpleadosState) => state.loading
);
export const selectEmpleadosError = createSelector(
  selectEmpleadosState,
  (state: EmpleadosState) => state.error
);
// Selectores para la creación de un nuevo empleado
export const selectCrearEmpleadoSuccess = createSelector(
  selectEmpleadosState,
  (state: EmpleadosState) => state.crear.success
);
export const selectCrearEmpleadoLoading = createSelector(
  selectEmpleadosState,
  (state: EmpleadosState) => state.crear.loading
);
export const selectCrearEmpleadoError = createSelector(
  selectEmpleadosState,
  (state: EmpleadosState) => state.crear.error
);

// Selector para saber si se eliminó un empleado
export const selectEmpleadoEliminado = createSelector(
  selectEmpleadosState,
  (state: EmpleadosState) => state.eliminar.success
);

// Selector para saber si se actualizó un empleado
export const selectEmpleadoActualizado = createSelector(
  selectEmpleadosState,
  (state: EmpleadosState) => state.actualizar.success
);
