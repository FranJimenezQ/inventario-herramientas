import { Component, Inject } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AppState } from '../../../../store/appState';
import { Store } from '@ngrx/store';
import { Proyecto } from '../../../../store/proyectos/proyectos.states';
import * as ProyectoSelectors from '../../../../store/proyectos/proyectos.selectors';
import * as proyectoActions from '../../../../store/proyectos/proyectos.actions';

@Component({
  selector: 'app-historial-proyectos-modal',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  templateUrl: './historial-proyectos-modal.component.html',
  styleUrl: './historial-proyectos-modal.component.scss'
})
export class HistorialProyectosModalComponent {

  displayedColumns: string[] = ['nombre', 'marca', 'modelo', 'fechaAsignacion'];
  public dataSource: Proyecto[] = [];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { proyectoId: string },
    public dialogRef: MatDialogRef<HistorialProyectosModalComponent>,
    private store: Store<AppState>

  ) {}

  ngOnInit() {
    this.store.dispatch(proyectoActions.obtenerHerramientasPorProyecto({ proyectoId: this.data.proyectoId }));
    this.store.select(ProyectoSelectors.selectHerramientasPorProyecto).subscribe((herramientas: any[]) => {
      this.dataSource = herramientas;
    });
  }

  cerrarModal() {
    this.dialogRef.close();
  }
}
