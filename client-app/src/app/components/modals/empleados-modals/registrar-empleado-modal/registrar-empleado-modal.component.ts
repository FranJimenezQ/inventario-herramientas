import { Component } from '@angular/core';
import { Form, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormField, MatLabel } from "@angular/material/form-field";
import { MatProgressSpinner } from "@angular/material/progress-spinner";
import { Store } from '@ngrx/store';
import { AppState } from '../../../../store/appState';
import { MatDialogRef } from '@angular/material/dialog';
import * as empleadosAcciones from '../../../../store/empleados/empleados.actions';
import { MatInput } from '@angular/material/input';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { NgIf } from '@angular/common';
import { Subscription } from 'rxjs';
import * as empleadosSelectors from '../../../../store/empleados/empleados.selectors';

@Component({
  selector: 'app-registrar-empleado-modal',
  standalone: true,
  imports: [MatFormField, MatLabel, MatProgressSpinner, FormsModule, MatInput, MatButtonModule, ReactiveFormsModule, NgIf],
  templateUrl: './registrar-empleado-modal.component.html',
  styleUrl: './registrar-empleado-modal.component.scss'
})
export class RegistrarEmpleadoModalComponent {

  public isLoading: boolean = false;
  public empleadoForm!: FormGroup;
  public subscriptions!: Subscription;

  constructor(
    private dialogRef: MatDialogRef<RegistrarEmpleadoModalComponent>,
    private fb: FormBuilder,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.empleadoForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      cargo: ['', Validators.required],
      idPersonal: ['', [Validators.required, Validators.min(1)]]
    });
  }

  cerrarModal() {
    this.dialogRef.close();
  }

  guardarEmpleado() {
    if (this.empleadoForm.valid) {
      this.isLoading = true;
      // Aquí puedes realizar la acción de guardar el empleado
      // Por ejemplo, llamar a un servicio para crear el empleado
      this.store.dispatch(empleadosAcciones.crearEmpleado({ empleado: this.empleadoForm.value }))
      this.subscriptions = this.store.select(empleadosSelectors.selectCrearEmpleadoSuccess).subscribe({
          next: () => {
            this.isLoading = false;
            this.dialogRef.close();
          },
          error: () => {
            this.isLoading = false;
            // Manejar el error
          }
        });
    }
  }

}
