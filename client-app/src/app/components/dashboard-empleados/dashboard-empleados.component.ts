import { Component, OnInit } from '@angular/core';
import { MatChipSet, MatChip } from "@angular/material/chips";
import { MatIcon } from "@angular/material/icon";
import { MatTableModule } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from '../../store/appState';
import { Empleado } from '../../store/empleados/empleados.state';
import { selectObtenerEmpleados } from '../../store/empleados/empleados.selectors';
import { RegistrarEmpleadoModalComponent } from '../modals/empleados-modals/registrar-empleado-modal/registrar-empleado-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { AccionesEmpleadoModalComponent } from '../modals/empleados-modals/acciones-empleado-modal/acciones-empleado-modal.component';

@Component({
  selector: 'app-dashboard-empleados',
  standalone: true,
  imports: [MatTableModule,MatChipSet, MatChip, MatIcon],
  templateUrl: './dashboard-empleados.component.html',
  styleUrl: './dashboard-empleados.component.scss'
})
export class DashboardEmpleadosComponent implements OnInit {

  public displayedColumns: string[] = ['nombre', 'apellido', 'cargo', 'idPersonal', 'acciones'];
  public listaEmpleados: Empleado[] = [];
  public empleadosDataSubscription!: Subscription;

  constructor(private store: Store<AppState>, private dialog: MatDialog) {

  }

  ngOnInit(): void {
    // Aquí puedes cargar los datos de los empleados desde un servicio o API
    this.empleadosDataSubscription = this.store.select(selectObtenerEmpleados).subscribe(empleados => {
      this.listaEmpleados = empleados;
    });
  }
  editarEmpleado( empleado: Empleado) {
    // Lógica para editar el empleado
    this.dialog.open(AccionesEmpleadoModalComponent, {
      data: { empleado }
    });
  }
  registrarUnEmpleado() {
    // Lógica para registrar un nuevo empleado
    this.dialog.open(RegistrarEmpleadoModalComponent);
  }

  ngOnDestroy(): void {
    this.empleadosDataSubscription?.unsubscribe();
  }
}
