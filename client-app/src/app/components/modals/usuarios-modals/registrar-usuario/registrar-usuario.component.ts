import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormField, MatLabel } from "@angular/material/form-field";
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinner } from "@angular/material/progress-spinner";
import { crearUsuario } from '../../../../store/usuarios/usuarios.actions';
import { AppState } from '../../../../store/appState';
import { Store } from '@ngrx/store';
import { MatOption } from "@angular/material/core";
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-register-user',
  standalone: true,
  imports: [MatFormField, MatLabel, MatProgressSpinner, NgIf, ReactiveFormsModule,
    FormsModule, MatInputModule, MatButtonModule, MatSelectModule, NgFor],
  templateUrl: './registrar-usuario.component.html',
  styleUrl: './registrar-usuario.component.scss'
})
export class RegistrarUsuarioComponent {

public isLoading: boolean = false;
public usuarioForm!: FormGroup;
public roles: string[] = ['ADMIN', 'EMPLEADO', 'TECNICO'];

constructor(
  private fb: FormBuilder,
  private dialogRef: MatDialogRef<RegistrarUsuarioComponent>,
  private store: Store<AppState>
) {
  this.usuarioForm = this.fb.group({
    nombre: ['', Validators.required],
    apellido: ['', Validators.required],
    personalId: ['', Validators.required],
    tipoDeRol: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });
}

cerrarModal() {
  this.dialogRef.close();
}
guardarUsuario() {
  if (this.usuarioForm.valid) {
    // Aquí puedes manejar el envío del formulario
    // Dispatch action para registrar el usuario
    const usuario = {
      nombre: this.usuarioForm.value.nombre,
      apellido: this.usuarioForm.value.apellido,
      id: this.usuarioForm.value.personalId,
      rol: this.usuarioForm.value.tipoDeRol,
      email: this.usuarioForm.value.email,
      password: this.usuarioForm.value.password
    }
    this.store.dispatch(crearUsuario({ usuario }));
    this.cerrarModal();
  } else {
    //console.log('Formulario no válido');
    return;
  }
}

}
