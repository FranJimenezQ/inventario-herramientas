import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import {MatChipsModule} from '@angular/material/chips';



@Component({
  selector: 'app-dashboard-herramientas',
  standalone: true,
  imports: [MatTableModule, MatChipsModule],
  templateUrl: './dashboard-herramientas.component.html',
  styleUrl: './dashboard-herramientas.component.scss'
})
export class DashboardHerramientasComponent {
  constructor() { }

  // Aquí puedes agregar la lógica específica para el componente de herramientas del dashboard
  dataSource = [
    {
      nombre: 'Martillo',
      marca: 'Bosch',
      modelo: 'XYZ123',
      tipo: 'Herramienta de mano',
      empleadoAsignado: 'Juan Pérez',
      fechaSalida: '2023-01-15',
      fechaRegreso: '2023-01-20',
      proyectoAsignado: 'Construcción',
      numeroSerie: '123456789'
    },
    // Agrega más elementos según sea necesario
  ];

  displayedColumns: string[] = ['nombre', 'marca', 'modelo', 'tipo', 'empleadoAsignado', 'fechaSalida', 'fechaRegreso', 'proyectoAsignado', 'numeroSerie', 'estado'];
}
