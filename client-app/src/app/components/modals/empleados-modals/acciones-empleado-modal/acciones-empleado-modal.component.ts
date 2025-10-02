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
    public empleadoActualizado!: FormGroup;
    public empleadosData: Empleado[] = [];
    public accionSeleccionada: string | null = null;
    public isLoading: boolean = false;
    public mensajeExito: string = '';

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
      // Lógica para eliminar el empleado
      this.accionSeleccionada = 'eliminar';

    }

    onSubmit() {
      const empleadoId = this.data.empleado._id;

      switch (this.accionSeleccionada) {
        case 'eliminar':
          //this.eliminarEmpleadoConfirm(empleadoId!);
          this.store.dispatch(empleadosActions.eliminarEmpleado({ idPersonal: this.data.empleado.idPersonal }));
          this.store.select(empleadosSelectors.selectEmpleadoEliminado).subscribe(success => {
            if (success) {
              this.cerrarModal();
            }
          });
          break;
        case 'editar':
          if (this.empleadoActualizado.invalid) {return;}
          this.store.dispatch(empleadosActions.actualizarEmpleado({ id: empleadoId, empleado: this.empleadoActualizado.value }));
          this.store.select(empleadosSelectors.selectEmpleadoActualizado).subscribe(success => {
            if (success) {
              this.cerrarModal();
            }
          });
          break;
      }
    }

    ngOnDestroy() {
      this.empleadoSubscriber?.unsubscribe();
    }
}

