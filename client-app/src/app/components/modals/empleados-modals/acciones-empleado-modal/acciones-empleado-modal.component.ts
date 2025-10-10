import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule, MatLabel } from '@angular/material/input';
import { AppState } from '../../../../store/appState';
import { Store } from '@ngrx/store';
import { Empleado } from '../../../../store/empleados/empleados.state';
import { Subscription } from 'rxjs/internal/Subscription';
import * as empleadosSelectors from '../../../../store/empleados/empleados.selectors';
import * as empleadosActions from '../../../../store/empleados/empleados.actions';
import { NgFor, NgIf, NgSwitch, NgSwitchCase } from '@angular/common';

@Component({
  selector: 'app-acciones-empleado-modal',
  standalone: true,
  imports: [ MatFormFieldModule, MatLabel, ReactiveFormsModule,
    MatInputModule, MatButtonModule, MatDialogModule, MatIconModule,
    NgSwitchCase, NgIf, NgSwitch
  ],
  templateUrl: './acciones-empleado-modal.component.html',
  styleUrl: './acciones-empleado-modal.component.scss'
})
export class AccionesEmpleadoModalComponent {


    public empleadoSubscriber!: Subscription;
    public empleadoActualizadoSubscriber!: Subscription;
    public empleadoEliminadoSubscriber!: Subscription;
    public empleadoActualizado!: FormGroup;
    public empleadosData: Empleado[] = [];
    public accionSeleccionada: string | null = null;
    public isLoading: boolean = false;
    public mensajeExito: string = '';
    public hasError: boolean = false;
    public mensajeError: string = '';

    constructor(
      @Inject(MAT_DIALOG_DATA) public data: { empleado: Empleado },
      private store: Store<AppState>,
      private fb: FormBuilder,
      private dialogRef: MatDialogRef<AccionesEmpleadoModalComponent>
    ) { }
    ngOnInit() {
      // Initialization logic
      this.empleadoActualizado = this.fb.group({
        nombre: [this.data.empleado.nombre, Validators.required],
        apellido: [this.data.empleado.apellido, Validators.required],
        cargo: [this.data.empleado.cargo, Validators.required],
        idPersonal: [this.data.empleado.idPersonal, Validators.required],
      });

      this.empleadoSubscriber = this.store.select(empleadosSelectors.selectObtenerEmpleados).subscribe(empleados => {
        this.empleadosData = empleados;
      });
    }
    cerrarModal() {
      // Lógica para cerrar el modal
      this.dialogRef.close();
    }

    actualizarEmpleado() {
      // Lógica para actualizar el empleado
      this.accionSeleccionada = 'actualizar';
      this.empleadoActualizado = this.fb.group({
        nombre: [this.data.empleado.nombre, Validators.required],
        apellido: [this.data.empleado.apellido, Validators.required],
        cargo: [this.data.empleado.cargo, Validators.required],
        idPersonal: [this.data.empleado.idPersonal, Validators.required],
      });
    }
    eliminarEmpleado() {
      this.accionSeleccionada = 'eliminar';

    }

    onSubmit() {
      const empleadoId = this.data.empleado._id;
      switch (this.accionSeleccionada) {
        case 'eliminar':
          this.store.dispatch(empleadosActions.eliminarEmpleado({ empleadoId: empleadoId }));
          this.empleadoEliminadoSubscriber = this.store.select(empleadosSelectors.selectEmpleadoEliminado).subscribe(response => {
            if (response.success) {
              this.isLoading = true;
              this.mensajeExito = response.mensaje || 'Empleado eliminado con éxito';
              setTimeout(() => {
                this.isLoading = false;
                this.cerrarModal();
              }, 2000);
            } else if (response.error) {
              this.isLoading = false;
              this.hasError = true;
              this.mensajeError = response.mensaje || 'Error al eliminar el empleado';
              console.error('Error al eliminar el empleado:', response.error);
              setTimeout(() => {
                this.hasError = false;
                this.cerrarModal();
              }, 2000);
            }
          });
          break;
        case 'actualizar':
          if (this.empleadoActualizado.invalid) {return;}
          this.store.dispatch(empleadosActions.actualizarEmpleado({ _id: empleadoId, empleado: this.empleadoActualizado.value }));
          this.empleadoActualizadoSubscriber = this.store.select(empleadosSelectors.selectEmpleadoActualizado).subscribe(response => {
            if (response.success) {
              this.isLoading = true;
              this.mensajeExito = response.mensaje || 'Empleado actualizado con éxito';
              setTimeout(() => {
                this.isLoading = false;
                this.cerrarModal();
              }, 2000);
            } else if (response.error) {
              this.isLoading = false;
              this.mensajeError = response.error || 'Error al actualizar el empleado';
              this.hasError = true;
            setTimeout(() => {
              this.hasError = false;
              this.cerrarModal();
            }, 2000);
            }
          });
          break;
      }
    }

    ngOnDestroy() {
      this.empleadoSubscriber?.unsubscribe();
      this.empleadoActualizadoSubscriber?.unsubscribe();
      this.empleadoEliminadoSubscriber?.unsubscribe();
    }
}
