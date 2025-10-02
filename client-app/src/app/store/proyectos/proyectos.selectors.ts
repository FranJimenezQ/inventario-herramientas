import { createSelector } from "@ngrx/store";
import { ProyectosState } from "./proyectos.states";

// Selector para el estado de proyectos
export const selectProyectosState = (state: { proyectos: ProyectosState }) => state.proyectos;

// Selector para obtener todos los proyectos
export const selectObtenerProyectos = createSelector(
  selectProyectosState,
  (state: ProyectosState) => state.proyectos
);
export const selectProyectosLoading = createSelector(
  selectProyectosState,
  (state: ProyectosState) => state.loading
);
export const selectProyectosError = createSelector(
  selectProyectosState,
  (state: ProyectosState) => state.error
);

// Selector para obtener un proyecto por ID
export const selectProyectoById = (id: string) =>
  createSelector(
    selectProyectosState,
    (state: ProyectosState) => state.proyectos.find(proyecto => proyecto._id === id)
  );

// Selector para obtener un proyecto por número de proyecto
export const selectProyectoByNumero = (numeroProyecto: string) =>
  createSelector(
    selectProyectosState,
    (state: ProyectosState) => state.proyectos.find(proyecto => proyecto.numeroProyecto === numeroProyecto)
  );


// Selectores para la creación de un nuevo proyecto
export const selectCrearProyectoLoading = createSelector(
  selectProyectosState,
  (state: ProyectosState) => state.crear.loading
);
export const selectCrearProyectoSuccess = createSelector(
  selectProyectosState,
  (state: ProyectosState) => state.crear.success
);
export const selectCrearProyectoError = createSelector(
  selectProyectosState,
  (state: ProyectosState) => state.crear.error
);

// Selector para saber si se eliminó un proyecto
export const selectProyectoEliminado = createSelector(
  selectProyectosState,
  (state: ProyectosState) => ({ success: state.eliminar.success, message: state.eliminar.message })
);
// Selector para saber si se actualizó un proyecto
export const selectProyectoActualizado = createSelector(
  selectProyectosState,
  (state: ProyectosState) => ({ success: state.actualizar.success, message: state.actualizar.message })
);

// Selector para obtener herramientas por proyecto
export const selectHerramientasPorProyecto = createSelector(
  selectProyectosState,
  (state: ProyectosState) => state.herramientas.herramientas
);
export const selectHerramientasLoading = createSelector(
  selectProyectosState,
  (state: ProyectosState) => state.herramientas.loading
);
export const selectHerramientasError = createSelector(
  selectProyectosState,
  (state: ProyectosState) => state.herramientas.error
);
