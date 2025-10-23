// Selectores para la entidad "Usuario"
import { createSelector } from "@ngrx/store";
import { UsuariosState } from "./usuarios.state";
import { state } from "@angular/animations";

// Selector para obtener el estado de los usuarios
export const selectUsuarioState = (state: { usuarios: UsuariosState }) => state.usuarios;

// Selector para obtener la lista de usuarios
export const selectUsuarios = createSelector(
  selectUsuarioState,
  (state: UsuariosState) => state.usuarios
);

// Selector para obtener un usuario por ID
export const selectUsuarioPorId = (id: string) =>
  createSelector(selectUsuarios, (usuarios) =>
    usuarios.find((usuario) => usuario.id === id)
  );
