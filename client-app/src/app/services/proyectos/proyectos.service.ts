import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Proyecto } from '../../store/proyectos/proyectos.states';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class ProyectosService {

  constructor( private http: HttpClient) { }

  private getAuthHeaders() {
    const token = sessionStorage.getItem('token');
    return { Authorization: `Bearer ${token}` };
  }
  private baseUrl = `${environment.apiUrl}/proyectos`;

  // Obtener todos los proyectos
  obtenerProyectos(): Observable<Proyecto[]> {
    return this.http.get<Proyecto[]>(this.baseUrl, { headers: this.getAuthHeaders() });
  }

  // Crear un nuevo proyecto
  crearProyecto(proyecto: Proyecto): Observable<Proyecto> {
    return this.http.post<Proyecto>(`${this.baseUrl}/registrarProyecto`, proyecto, { headers: this.getAuthHeaders() });
  }

  // Actualizar un proyecto existente
  actualizarProyecto(id: string, proyecto: Proyecto): Observable<Proyecto> {
    return this.http.put<Proyecto>(`${this.baseUrl}/actualizarProyecto/${id}`, proyecto, { headers: this.getAuthHeaders() });
  }

  // Eliminar un proyecto
  eliminarProyecto(proyectoId: string): Observable<{ message: string; proyectoId: string }> {
    return this.http.delete<{ message: string; proyectoId: string }>(`${this.baseUrl}/eliminarProyecto/${proyectoId}`, { headers: this.getAuthHeaders() });
  }

  // todas las herramientas asociadas a un proyecto
  obtenerHerramientasPorProyecto(proyectoId: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/herramientas/${proyectoId}`, { headers: this.getAuthHeaders() });
  }
}
