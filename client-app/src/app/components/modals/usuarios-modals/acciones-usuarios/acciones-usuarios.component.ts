import { NgFor, NgIf, NgSwitch, NgSwitchCase } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatOption, MatSelect } from '@angular/material/select';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../store/appState';
import { Usuario } from '../../../../store/usuarios/usuarios.state';
import { Subscription } from 'rxjs/internal/Subscription';
import * as usuarioActions from '../../../../store/usuarios/usuarios.actions';


@Component({
  selector: 'app-acciones-usuarios',
  standalone: true,
  imports: [NgSwitch, MatFormFieldModule, MatLabel, ReactiveFormsModule,
    NgSwitchCase, MatInputModule, MatIconModule, FormsModule, MatFormFieldModule,
    NgIf, MatSelect, MatOption, NgFor],
  templateUrl: './acciones-usuarios.component.html',
  styleUrl: './acciones-usuarios.component.scss'
})
export class AccionesUsuariosComponent {

    public usuarioSubscriber!: Subscription;
    public usuarioActualizado!: FormGroup;
    public usuariosData: Usuario[] = [];
    public accionSeleccionada: string | null = null;
    public isLoading: boolean = false;
    public mensajeExito: string = '';

    constructor(
      @Inject(MAT_DIALOG_DATA) public data: { usuario: Usuario },
      private store: Store<AppState>,
      private fb: FormBuilder,
      private dialogRef: MatDialogRef<AccionesUsuariosComponent>
    ) { }

    ngOnInit() {
      // Initialization logic
      this.usuarioActualizado = this.fb.group({
        nombre: [this.data.usuario.nombre],
        apellido: [this.data.usuario.apellido],
        email: [this.data.usuario.email],
        personalId: [this.data.usuario.id],
        rol: [this.data.usuario.rol],
        password: ['']
      });

      this.usuarioSubscriber = this.store.select('usuarios').subscribe(usuariosState => {
        this.usuariosData = usuariosState.usuarios;
      });
    }

    cerrarModal() {
      // Lógica para cerrar el modal
      this.dialogRef.close();
    }

    editarUsuario() {
      // Lógica para editar el usuario
      this.accionSeleccionada = 'actualizar';
      this.usuarioActualizado = this.fb.group({
        nombre: [this.data.usuario.nombre],
        apellido: [this.data.usuario.apellido],
        email: [this.data.usuario.email],
        id: [this.data.usuario.id],
        rol: [this.data.usuario.rol],
        password: ['']
      });
    }

    eliminarUsuario() {
      // Lógica para eliminar el usuario
      this.accionSeleccionada = 'eliminar';
    }

    onSubmit() {
      const usuarioId = this.data.usuario._id || '';
      switch (this.accionSeleccionada) {
        case 'eliminar':
          //this.eliminarUsuarioConfirm(usuarioId!);
          this.store.dispatch(usuarioActions.eliminarUsuario({ _id: usuarioId }));
          this.store.select(state => state.usuarios.eliminar.success).subscribe(success => {
            if (success) {
              this.cerrarModal();
            }
          });
          break;
        case 'actualizar':
          if(this.usuarioActualizado.invalid){ return; }
          const { nombre, apellido, email, id, rol, password } = this.usuarioActualizado.value;
          const usuarioActualizado = { nombre, apellido, email, id, rol, password };
          this.store.dispatch(usuarioActions.actualizarUsuario({ _id: usuarioId, usuario: usuarioActualizado }));
          this.cerrarModal();
          break;
        default:
          break;
      }
    }
}
