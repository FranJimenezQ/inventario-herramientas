import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Herramienta } from '../../../../store/herramientas/herramientas.state';
import { DatePipe, NgFor, NgIf, NgSwitch, NgSwitchCase } from '@angular/common';
import { MatFormField, MatFormFieldModule, MatLabel } from "@angular/material/form-field";
import { Form, FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { AppState } from '../../../../store/appState';
import { Store } from '@ngrx/store';
import * as herramientaActions from '../../../../store/herramientas/herramientas.actions';
import * as herramientaSelectors from '../../../../store/herramientas/herramientas.selectors';
import { Subscription } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { Empleado } from '../../../../store/empleados/empleados.state';
import { Proyecto } from '../../../../store/proyectos/proyectos.states';
import * as proyectoSelectors from '../../../../store/proyectos/proyectos.selectors';
import * as empleadoSelectors from '../../../../store/empleados/empleados.selectors';
import { MatOption, MatSelect } from "@angular/material/select";
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter} from '@angular/material/core';
import * as movientosActions from '../../../../store/movimientos/movimiento.actions';
import * as movimientoSelectors from '../../../../store/movimientos/movimiento.selectors';



@Component({
  selector: 'app-acciones-herramienta',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [DatePipe, NgSwitch, MatFormField, MatLabel, ReactiveFormsModule,
    NgSwitchCase, MatInputModule, MatIconModule, FormsModule, MatFormFieldModule,
    NgIf, MatSelect, MatOption, NgFor, MatDatepickerModule],
  templateUrl: './acciones-herramienta.component.html',
  styleUrl: './acciones-herramienta.component.scss'
})
export class AccionesHerramientaComponent {

  public accionFormGroup!: FormGroup;
  public accionSeleccionada: string | null = null;
  public herramientaEliminadaSuccesSubscriber!: Subscription
  public herramientaActualizadaSubscriber!: Subscription
  public obtenerEmpleadosSuccessSubscriber!: Subscription
  public obtenerProyectosSuccessSubscriber!: Subscription
  public isLoading: boolean = false;
  public empleados: Empleado[] = [];
  public proyectos: Proyecto[] = [];

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
    this.obtenerEmpleadosSuccessSubscriber = this.store.select(empleadoSelectors.selectObtenerEmpleados).subscribe(empleados => {
      if (empleados) {
        this.empleados = empleados;
      }
    });
    this.obtenerProyectosSuccessSubscriber = this.store.select(proyectoSelectors.selectObtenerProyectos).subscribe(proyectos => {
      if (proyectos) {
        this.proyectos = proyectos;
      }
    });
  }

  editarHerramienta() {
    this.accionSeleccionada = 'actualizar';
    this.accionFormGroup = this.fb.group({
      nombre: [this.data.herramienta.nombre, Validators.required],
      marca: [this.data.herramienta.marca, Validators.required],
      tipo: [this.data.herramienta.tipo, Validators.required],
      modelo: [this.data.herramienta.modelo, Validators.required],
      numeroSerie: [this.data.herramienta.numeroSerie, Validators.required],
      estado: [this.data.herramienta.estado, Validators.required],
    });
    // Lógica para editar la herramienta
  }
  eliminarHerramienta() {
    this.accionSeleccionada = 'eliminar';
    //this.accionFormGroup = this.fb.group({});
  }

  asignarHerramienta() {
    this.accionSeleccionada = 'asignar';
    this.accionFormGroup = this.fb.group({
      empleadoAsignado: ['', Validators.required],
      proyectoAsignado: ['', Validators.required],
      fechaAsignacion: ['', Validators.required]
    });
    // Lógica para asignar la herramienta
  }

  devolverHerramienta() {
    this.accionSeleccionada = 'devolver';
    this.accionFormGroup = this.fb.group({
      fechaDevolucion: ['', Validators.required],
      estado: ['', Validators.required]
    });
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
        if (!idHerramienta) { return; }
        this.store.dispatch(herramientaActions.eliminarHerramienta({ _id: idHerramienta }));
        this.herramientaEliminadaSuccesSubscriber = this.store.select(herramientaSelectors.selectHerramientaEliminada).subscribe(eliminada => {
          if (eliminada) {
            this.isLoading = true
            setTimeout(() => {
              this.isLoading = false;
              this.dialogRef.close(true);
            }, 2000);
          }
        });
        break;
      case 'actualizar':
        // lógica para actualizar la herramienta
        if (this.accionFormGroup.invalid) { return; }
        const { nombre, marca, modelo, tipo, numeroSerie, estado } = this.accionFormGroup.value;
        const herramientaActualizada = { nombre, marca, modelo, tipo, numeroSerie, estado };
        this.store.dispatch(herramientaActions.actualizarHerramienta({ id: idHerramienta!, herramienta: herramientaActualizada }));
        this.isLoading = true;
        // Cierra el modal inmediatamente, el dashboard ya está suscrito al store
        this.dialogRef.close(true);
        break;
      case 'asignar':
        // logica para asignar
        if (this.accionFormGroup.invalid) { return; }
        const { empleadoAsignado, proyectoAsignado, fechaAsignacion } = this.accionFormGroup.value;
        const herramientaAsignada = {
          nombre: this.data.herramienta.nombre,
          marca: this.data.herramienta.marca,
          modelo: this.data.herramienta.modelo,
          tipo: this.data.herramienta.tipo,
          numeroSerie: this.data.herramienta.numeroSerie,
          estado: this.data.herramienta.estado,
          empleadoAsignado,
          proyectoAsignado,
          fechaSalida: fechaAsignacion,
          fechaRegreso: null
        };
        this.store.dispatch(
          herramientaActions.asignarHerramienta(
            { id: idHerramienta!,
              proyectoId: proyectoAsignado,
              empleadoId: empleadoAsignado,
              fechaSalida: fechaAsignacion
            }
            ));
        this.isLoading = true;
        this.dialogRef.close(true);
        break;
      case 'devolver':
        // lógica para devolver la herramienta
        if (this.accionFormGroup.invalid) { return; }
        const { fechaDevolucion, estado: estadoDevolucion } = this.accionFormGroup.value;
        this.store.dispatch(movientosActions.devolverHerramienta({
          herramientaId: idHerramienta!,
          fechaDevolucion,
          estado: estadoDevolucion,
          empleadoAsignado: null,
          proyectoAsignado: null
        }));
        this.isLoading = true;
        this.dialogRef.close(true);
        break;
      default:
        break;
    }
  }

  ngOnDestroy() {
    this.isLoading = false;
    this.herramientaEliminadaSuccesSubscriber?.unsubscribe();
    this.herramientaActualizadaSubscriber?.unsubscribe();
  }
}
