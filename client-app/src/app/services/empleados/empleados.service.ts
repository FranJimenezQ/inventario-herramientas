import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Empleado } from '../../store/empleados/empleados.state';
@Injectable({
  providedIn: 'root'
})
export class EmpleadosService {

  constructor(private httpClient: HttpClient) { }
  private baseUrl = 'http://localhost:3000/api/empleados';
  protected getAuthHeaders() {
    const token = sessionStorage.getItem('token');
    return { Authorization: `Bearer ${token}` };
  }

  // Método para obtener todos los empleados
  obtenerEmpleados(): Observable<Empleado[]> {
    return this.httpClient.get<Empleado[]>(this.baseUrl, { headers: this.getAuthHeaders() });
  }

  // Método para crear un nuevo empleado
  crearEmpleado(empleado: Empleado): Observable<Empleado> {
    return this.httpClient.post<Empleado>(`${this.baseUrl}/registrarEmpleado`, empleado, { headers: this.getAuthHeaders() });
  }

  // Método para actualizar un empleado existente
  actualizarEmpleado(_id: string, empleado: Empleado): Observable<Empleado> {
    return this.httpClient.put<Empleado>(`${this.baseUrl}/actualizarEmpleado/${_id}`, empleado, { headers: this.getAuthHeaders() });
  }

  // Método para eliminar un empleado
  eliminarEmpleado(_id: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseUrl}/eliminarEmpleado/${_id}`, { headers: this.getAuthHeaders() });
  }
}
