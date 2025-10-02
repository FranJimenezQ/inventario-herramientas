import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatChipSet, MatChip } from "@angular/material/chips";
import { MatIconModule } from "@angular/material/icon";
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/appState';
import { MatDialog } from '@angular/material/dialog';
import { ChangeDetectorRef } from '@angular/core';
import * as proyectoSelectors from '../../store/proyectos/proyectos.selectors';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { Proyecto } from '../../store/proyectos/proyectos.states';
import { RegistrarProyectoComponent } from '../modals/proyectos-modals/register-project/registrar-proyecto.component';
import { AccionesProyectosComponent } from '../modals/proyectos-modals/acciones-proyectos/acciones-proyectos.component';
import { HistorialProyectosModalComponent } from '../modals/proyectos-modals/historial-proyectos-modal/historial-proyectos-modal.component';
@Component({
  selector: 'app-dashboard-proyectos',
  standalone: true,
  imports: [MatChipSet, MatChip, MatIconModule, MatTableModule, MatButtonModule, CommonModule],
  templateUrl: './dashboard-proyectos.component.html',
  styleUrl: './dashboard-proyectos.component.scss'
})
export class DashboardProyectosComponent implements OnInit, OnDestroy {
  constructor(private store: Store<AppState>, private dialog: MatDialog , private cdr: ChangeDetectorRef) { }

  displayedColumns: string[] = ['nombre', 'numeroProyecto', 'direccion', 'acciones'];
  public proyectos: Proyecto[] = []; // Cambia 'any' por el tipo adecuado
  public proyectoSubscriber!: Subscription;


  ngOnInit() {
    // Aquí puedes cargar los proyectos desde el store o un servicio
    this.proyectoSubscriber = this.store.select(proyectoSelectors.selectObtenerProyectos).subscribe(proyectos => {
      this.proyectos = proyectos;
      console.log(this.proyectos);

      this.cdr.detectChanges();
    });
  }
  eliminarProyecto(proyectoId: string) {
    // Implementa la lógica para eliminar un proyecto
  }
  editarProyecto(proyecto: Proyecto) {
    // Implementa la lógica para editar un proyecto
    this.dialog.open(AccionesProyectosComponent, {
      data: { proyecto }
    });
  }
  abrirDetallesProyecto(proyectoId: string) {
    // Implementa la lógica para abrir los detalles del proyecto
    this.dialog.open(HistorialProyectosModalComponent,
      {
        data: { proyectoId }
      }
    )
  }


  registrarUnProyecto() {
    // Implementa la lógica para registrar un nuevo proyecto
    this.dialog.open(RegistrarProyectoComponent);
  }

  ngOnDestroy() {
    // Aquí puedes limpiar recursos o suscripciones
    this.proyectoSubscriber?.unsubscribe();
  }

}
