import { NgFor, NgIf, NgSwitch, NgSwitchCase } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormField, MatLabel, MatOption, MatSelect } from '@angular/material/select';
import * as proyectoSelectors from '../../../../store/proyectos/proyectos.selectors';
import { AppState } from '../../../../store/appState';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Proyecto } from '../../../../store/proyectos/proyectos.states';
import * as proyectoActions from '../../../../store/proyectos/proyectos.actions';


@Component({
  selector: 'app-acciones-proyectos',
  standalone: true,
  imports: [ NgSwitch, MatFormField, MatLabel, ReactiveFormsModule,
    NgSwitchCase, MatInputModule, MatIconModule, FormsModule, MatFormFieldModule,
    NgIf, MatSelect, MatOption, NgFor],
  templateUrl: './acciones-proyectos.component.html',
  styleUrl: './acciones-proyectos.component.scss'
})
export class AccionesProyectosComponent implements OnInit {

  // Component logic goes here
  public proyectoSubscriber!: Subscription;
  public proyectoActualizado!: FormGroup;
  public proyectosData: Proyecto[] = [];
  public accionSeleccionada: string | null = null;
  public isLoading: boolean = false;
  public mensajeExito: string = '';


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { proyecto: Proyecto },
    private store: Store<AppState>,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AccionesProyectosComponent>
  ) { }
  ngOnInit() {
    // Initialization logic
    this.proyectoActualizado = this.fb.group({
      nombre: [this.data.proyecto.nombre, Validators.required],
      numeroProyecto: [this.data.proyecto.numeroProyecto, Validators.required],
      direccion: [this.data.proyecto.direccion, Validators.required]
    });
    this.proyectoSubscriber = this.store.select(proyectoSelectors.selectObtenerProyectos).subscribe(proyectos => {
      console.log(proyectos);
      this.proyectosData = proyectos;
    });
  }
  cerrarModal() {
    // Lógica para cerrar el modal
    this.dialogRef.close();
  }
  eliminarProyecto() {
    // Lógica para eliminar el proyecto
    this.accionSeleccionada = 'eliminar';
  }
  editarProyecto() {
    // Lógica para editar el proyecto
    this.accionSeleccionada = 'actualizar';
    this.proyectoActualizado = this.fb.group({
      nombre: [this.data.proyecto.nombre, Validators.required],
      numeroProyecto: [this.data.proyecto.numeroProyecto, Validators.required],
      direccion: [this.data.proyecto.direccion, Validators.required]
    });

  }

  onSubmit() {
    const proyectoId = this.data.proyecto._id;

    switch (this.accionSeleccionada) {
      case 'eliminar':
        //this.eliminarProyectoConfirm(proyectoId!);
        this.store.dispatch(proyectoActions.eliminarProyecto({ proyectoId: proyectoId }));
        this.store.select(proyectoSelectors.selectProyectoEliminado).subscribe(success => {
          if (success) {
            this.mensajeExito = success.message || 'Proyecto eliminado exitosamente';
            // Cerrar el modal después de mostrar el mensaje
            setTimeout(() => { this.cerrarModal(); }, 800);
            // Limpiar el mensaje de éxito
            this.mensajeExito = '';
          }
        });
        break;
      case 'actualizar':
        if(this.proyectoActualizado.invalid){ return; }
        // Lógica para actualizar el proyecto
        const { nombre, numeroProyecto, direccion } = this.proyectoActualizado.value;
        const proyectoActualizado = { _id: proyectoId, nombre, numeroProyecto, direccion };
        this.store.dispatch(proyectoActions.actualizarProyecto({ id: proyectoId, proyecto: proyectoActualizado }));
        this.cerrarModal();
        break;
      default:
        break;
    }
  }
}
