import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormField, MatLabel } from "@angular/material/form-field";
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { crearHerramienta } from '../../../../store/herramientas/herramientas.actions';
import { AppState } from '../../../../store/appState';
import { Store } from '@ngrx/store';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { NgIf } from '@angular/common';
import { selectCrearHerramientaLoading, selectCrearHerramientaSuccess, selectCrearHerramientaError } from '../../../../store/herramientas/herramientas.selectors';
import { Subscription } from 'rxjs/internal/Subscription';



@Component({
  selector: 'app-register-tool',
  standalone: true,
  imports: [MatFormField, MatLabel, ReactiveFormsModule, FormsModule, NgIf,
    MatInputModule, MatButtonModule, MatDialogModule, MatProgressSpinnerModule
  ],
  templateUrl: './registrar-herramienta.component.html',
  styleUrl: './registrar-herramienta.component.scss'
})
export class RegistrarHerramientaComponent implements OnInit, OnDestroy {

    // Se tiene que configurar el formulario con un formgroup
  public herramientaForm!: FormGroup;
  public isLoading: boolean = false;
  public subscriptions = new Subscription();

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
            this.cerrarModal();
          }
        })
      );

      this.subscriptions.add(
        this.store.select(selectCrearHerramientaError).subscribe(error => {
          if (error) {
            // Manejar el error
          }
        })
      );
    }

    public cerrarModal(){
      this.dialogRef.close();
    }

    public guardarHerramienta(){
      // Hacer el dispatch
      if (this.herramientaForm.invalid) {return;}
      const { nombre, marca, modelo, tipo, numeroSerie, estado } = this.herramientaForm.value;
      const nuevaHerramienta = { nombre, marca, modelo, tipo, numeroSerie, estado };
      this.store.dispatch(crearHerramienta({herramienta: nuevaHerramienta}));
      this.cerrarModal();
    }

    ngOnDestroy() {
      this.subscriptions?.unsubscribe();
    }

}
