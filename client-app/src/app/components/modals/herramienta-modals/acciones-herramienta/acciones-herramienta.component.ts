import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Herramienta } from '../../../../store/herramientas/herramientas.state';
import { DatePipe, NgSwitch, NgSwitchCase } from '@angular/common';
import { MatFormField, MatLabel } from "@angular/material/form-field";
import { Form, FormBuilder, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { AppState } from '../../../../store/appState';
import { Store } from '@ngrx/store';
import * as herramientaActions from '../../../../store/herramientas/herramientas.actions';
import { selectHerramientaEliminada } from '../../../../store/herramientas/herramientas.selectors';
import { Subscription } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-acciones-herramienta',
  standalone: true,
  imports: [DatePipe, NgSwitch, MatFormField, MatLabel, ReactiveFormsModule,
    NgSwitchCase, MatInputModule, MatIconModule],
  templateUrl: './acciones-herramienta.component.html',
  styleUrl: './acciones-herramienta.component.scss'
})
export class AccionesHerramientaComponent {

  public accionFormGroup!: FormGroup;
  public accionSeleccionada: string | null = null;
  public herramientaEliminadaSuccesSubscriber!: Subscription

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { herramienta: Herramienta },
    public dialogRef: MatDialogRef<AccionesHerramientaComponent>,
    private fb: FormBuilder,
    private store: Store<AppState>
  ) {
    this.accionFormGroup = this.fb.group({});
  }

  ngOnInit() {
    console.log(this.data.herramienta);
  }

  editarHerramienta() {
    this.accionSeleccionada = 'actualizar';
    this.accionFormGroup = this.fb.group({
      nombre: [this.data.herramienta.nombre],
      // Otros campos del formulario
    });
    // Lógica para editar la herramienta
  }
  eliminarHerramienta() {
    this.accionSeleccionada = 'eliminar';
    //this.accionFormGroup = this.fb.group({});
  }

  asignarHerramienta() {
    this.accionSeleccionada = 'asignar';
    this.accionFormGroup = this.fb.group({});
    // Lógica para asignar la herramienta
  }

  devolverHerramienta() {
    this.accionSeleccionada = 'devolver';
    this.accionFormGroup = this.fb.group({});
    // Lógica para devolver la herramienta
  }

  cerrarModal() {
    this.dialogRef.close();
  }

  onSubmit() {
    const idHerramienta = this.data.herramienta._id;
    switch (this.accionSeleccionada) {
      case 'eliminar':
        //logica
        this.store.dispatch(herramientaActions.eliminarHerramienta({ _id: this.data.herramienta._id! }));
        this.herramientaEliminadaSuccesSubscriber = this.store.select(selectHerramientaEliminada).subscribe(eliminada => {
          if (eliminada) {
            console.log('Herramienta eliminada con éxito', eliminada);
            this.dialogRef.close(true);
          }
        });
        break;
      case 'actualizar':
        // lógica para actualizar la herramienta
        break;
      case 'asignar':
        // logica para asignar
        break;
      case 'devolver':
        // lógica para devolver la herramienta
        break;
      default:
        break;
    }
  }


  ngOnDestroy() {
    this.herramientaEliminadaSuccesSubscriber?.unsubscribe();
  }
}
