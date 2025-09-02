import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Herramienta } from '../../../../store/herramientas/herramientas.state';
import { DatePipe, NgSwitch, NgSwitchCase } from '@angular/common';
import { MatFormField, MatLabel } from "@angular/material/form-field";
import { Form, FormBuilder, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-acciones-herramienta',
  standalone: true,
  imports: [DatePipe, NgSwitch, MatFormField, MatLabel, ReactiveFormsModule, NgSwitchCase],
  templateUrl: './acciones-herramienta.component.html',
  styleUrl: './acciones-herramienta.component.scss'
})
export class AccionesHerramientaComponent {

  public accionFormGroup!: FormGroup;
  public accionSeleccionada: string | null = null;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {herramienta: Herramienta},
    public dialogRef: MatDialogRef<AccionesHerramientaComponent>,
    private fb: FormBuilder
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
    this.accionFormGroup = this.fb.group({});
    // Lógica para eliminar la herramienta
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

  onSubmit(){
    switch(this.accionSeleccionada){
      case 'eliminar':
        //logica
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

}
