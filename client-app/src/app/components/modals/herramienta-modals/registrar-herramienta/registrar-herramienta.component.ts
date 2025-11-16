import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormField, MatLabel } from "@angular/material/form-field";
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { crearHerramienta, limpiarEstadoCrearHerramienta } from '../../../../store/herramientas/herramientas.actions';
import { AppState } from '../../../../store/appState';
import { Store } from '@ngrx/store';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { NgIf } from '@angular/common';
import { selectCrearHerramientaLoading, selectCrearHerramientaSuccess, selectCrearHerramientaError } from '../../../../store/herramientas/herramientas.selectors';
import { Subscription } from 'rxjs/internal/Subscription';
import { MatIconModule } from "@angular/material/icon";



@Component({
  selector: 'app-register-tool',
  standalone: true,
  imports: [MatFormField, MatLabel, ReactiveFormsModule, FormsModule, NgIf,
    MatInputModule, MatButtonModule, MatDialogModule, MatProgressSpinnerModule, MatIconModule],
  templateUrl: './registrar-herramienta.component.html',
  styleUrl: './registrar-herramienta.component.scss'
})
export class RegistrarHerramientaComponent implements OnInit, OnDestroy {

    // Se tiene que configurar el formulario con un formgroup
  public herramientaForm!: FormGroup;
  public isLoading: boolean = false;
  public subscriptions = new Subscription();
  public errorMessage: string = '';
  public successMessage: string = '';

    constructor(
      private dialogRef: MatDialogRef<RegistrarHerramientaComponent>,
      private fb: FormBuilder,
      private store: Store<AppState>
    ) {}

    ngOnInit() {
      // Initialize form or fetch data if needed
      this.herramientaForm = this.fb.group({
        nombre: ['', Validators.required],
        marca: ['', Validators.required],
        modelo: ['', Validators.required],
        tipo: ['', Validators.required],
        numeroSerie: ['', Validators.required],
        estado: ['', Validators.required]
      });

      this.subscriptions.add(
        this.store.select(selectCrearHerramientaLoading).subscribe(loading => {
          this.isLoading = !!loading;
        })
      );

      this.subscriptions.add(
        this.store.select(selectCrearHerramientaSuccess).subscribe(success => {
          if (success) {
            //this.cerrarModal();
            this.successMessage = 'Herramienta creada con éxito';
            setTimeout(() => {
              this.cerrarModal();
            }, 7500);
          }
        })
      );

      this.subscriptions.add(
        this.store.select(selectCrearHerramientaError).subscribe(error => {
          if (error) {
            // Manejar el error
            console.log('Error al crear herramienta: ', error);
            // Agregar a la variable errorMessage el contenido del mensaje de error del array error
            this.errorMessage = error.error.message;

          }
        })
      );
    }

    public cerrarModal(){
      this.dialogRef.close();
      this.errorMessage = '';
      this.successMessage = '';
    }

    public guardarHerramienta(){
      // Hacer el dispatch
      if (this.herramientaForm.invalid) {return;}
      const { nombre, marca, modelo, tipo, numeroSerie, estado } = this.herramientaForm.value;
      const nuevaHerramienta = { nombre, marca, modelo, tipo, numeroSerie, estado };
      this.store.dispatch(crearHerramienta({herramienta: nuevaHerramienta}));
      //this.cerrarModal();
    }

    ngOnDestroy() {
      this.subscriptions?.unsubscribe();
      // Necesitamos limpiar el mensaje de error al cerrar el modal
      this.errorMessage = '';
      this.successMessage = '';
      //Necesitamos limpiar el selector de crear herramienta success y error al cerrar el modal
      this.store.dispatch(limpiarEstadoCrearHerramienta());
    }

}
