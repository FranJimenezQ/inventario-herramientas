import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormField, MatLabel } from "@angular/material/form-field";
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinner } from "@angular/material/progress-spinner";

@Component({
  selector: 'app-register-user',
  standalone: true,
  imports: [MatFormField, MatLabel, MatProgressSpinner, NgIf, ReactiveFormsModule, FormsModule, MatInputModule, MatButtonModule],
  templateUrl: './registrar-usuario.component.html',
  styleUrl: './registrar-usuario.component.scss'
})
export class RegistrarUsuarioComponent {

public isLoading: boolean = false;
public usuarioForm!: FormGroup;

constructor(
  private fb: FormBuilder,
  private dialogRef: MatDialogRef<RegistrarUsuarioComponent>
) {
  this.usuarioForm = this.fb.group({
    nombre: ['', Validators.required],
    apellido: ['', Validators.required],
    idPersonal: ['', Validators.required],
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
    console.log(this.usuarioForm.value);
  } else {
    console.log('Formulario no válido');
  }
}

}
