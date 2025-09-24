import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import {MatChipsModule} from '@angular/material/chips';
import { selectTodasHerramientas } from '../../store/herramientas/herramientas.selectors';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/internal/Subscription';
import { Herramienta } from '../../store/herramientas/herramientas.state';
import { AppState } from '../../store/appState';
import { MatDialog } from '@angular/material/dialog';
import { RegistrarHerramientaComponent } from '../modals/herramienta-modals/registrar-herramienta/registrar-herramienta.component';
import { DatePipe, CommonModule } from '@angular/common';
import { AccionesHerramientaComponent } from '../modals/herramienta-modals/acciones-herramienta/acciones-herramienta.component';
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from '@angular/material/button';



@Component({
  selector: 'app-dashboard-herramientas',
  standalone: true,
  imports: [MatTableModule, MatChipsModule, DatePipe, CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './dashboard-herramientas.component.html',
  styleUrl: './dashboard-herramientas.component.scss'
})
export class DashboardHerramientasComponent implements OnInit, OnDestroy {
  constructor(private store: Store<AppState>, private dialog: MatDialog, private cdr: ChangeDetectorRef) { }

  public selectHerramientasSubscriber! : Subscription;
  public listaHerramientas: Herramienta[] = [];


  displayedColumns: string[] = ['nombre', 'marca', 'modelo', 'tipo', 'empleadoAsignado', 'fechaSalida', 'fechaRegreso', 'proyectoAsignado', 'numeroSerie', 'estado', 'acciones'];


  ngOnInit() {
    this.selectHerramientasSubscriber = this.store.select(selectTodasHerramientas).subscribe(herramientas => {
      this.listaHerramientas = [...herramientas];
      this.cdr.detectChanges();
      console.log(this.listaHerramientas);
    });
  }

  public abrirRegistrarHerramientasModal() {
    const dialogRef = this.dialog.open(RegistrarHerramientaComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Handle the result from the modal
      }
    });
  }

  public abrirAccionesHerramientaModal(herramienta: Herramienta) {
    const dialogRef = this.dialog.open(AccionesHerramientaComponent, {
      data: {herramienta}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Handle the result from the modal
      }
    });
  }

  ngOnDestroy() {
    this.selectHerramientasSubscriber?.unsubscribe();
  }

}
