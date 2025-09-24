import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Form, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatFormField, MatFormFieldModule, MatLabel } from "@angular/material/form-field";
import { AppState } from '../../../../store/appState';
import { Store } from '@ngrx/store';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { NgIf } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { crearProyecto } from '../../../../store/proyectos/proyectos.actions';
import { selectCrearProyectoSuccess } from '../../../../store/proyectos/proyectos.selectors';
import { Subscription } from 'rxjs';
import { MatIconModule } from "@angular/material/icon";

@Component({
  selector: 'app-register-project',
  standalone: true,
  imports: [MatFormField, MatLabel, ReactiveFormsModule, FormsModule, NgIf,
    MatInputModule, MatButtonModule, MatDialogModule, MatProgressSpinnerModule, MatIconModule],
  templateUrl: './registrar-proyecto.component.html',
  styleUrl: './registrar-proyecto.component.scss'
})
export class RegistrarProyectoComponent implements OnInit {
  public proyectoForm!: FormGroup;
  public subscription!: Subscription;
  public mensageExitoLogin: string = '';
  public errorMessage = '';



  constructor(
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<RegistrarProyectoComponent>,
    private fb: FormBuilder,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.proyectoForm = this.fb.group({
      nombre: ['', Validators.required],
      numeroProyecto: ['', Validators.required],
      direccion: ['', Validators.required]
    });
    if (this.proyectoForm.invalid) {
      this.errorMessage = 'Complete los campos requeridos.';
    }

    this.subscription = this.store.select(selectCrearProyectoSuccess).subscribe(success => {
      if (success) {
        this.mensageExitoLogin = 'Proyecto creado con éxito';
        setTimeout(() => {
          this.closeModal();
        }, 750);
      }

    });
  }

  registrarProyecto() {
    // Lógica para registrar el proyecto
    const nuevoProyecto = this.proyectoForm.value;
    this.store.dispatch(crearProyecto({ proyecto: nuevoProyecto }));
    console.log('Proyecto registrado:', nuevoProyecto);
  }
  public closeModal() {
    this.dialogRef.close();
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
