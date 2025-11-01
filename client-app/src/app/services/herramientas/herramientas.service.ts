import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Herramienta } from '../../store/herramientas/herramientas.state';
import { environment } from '../../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class HerramientasService {

  private baseUrl = `${environment.apiUrl}/herramientas`;

  constructor( private http: HttpClient) { }

  protected getAuthHeaders() {
    const token = sessionStorage.getItem('token');
    return { Authorization: `Bearer ${token}` };
  }

  getHerramientas(): Observable<Herramienta[]> {
    return this.http.get<Herramienta[]>(`${this.baseUrl}`, { headers: this.getAuthHeaders() });
  }

  crearHerramienta(herramienta: Herramienta): Observable<Herramienta> {
    return this.http.post<Herramienta>(`${this.baseUrl}/registrarHerramienta`, herramienta, { headers: this.getAuthHeaders() });
  }

  actualizarHerramienta(id: string, herramienta: Herramienta): Observable<Herramienta> {
    return this.http.put<Herramienta>(`${this.baseUrl}/actualizarHerramienta/${id}`, herramienta, { headers: this.getAuthHeaders() });
  }

  eliminarHerramienta(_id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/eliminarHerramienta/${_id}`, { headers: this.getAuthHeaders() });
  }

  asignarHerramienta(id: string, data: { proyectoAsignado: string; empleadoAsignado: string; fechaSalida?: string }): Observable<Herramienta> {
    return this.http.put<Herramienta>(`${this.baseUrl}/asignarHerramienta/${id}`, data, { headers: this.getAuthHeaders() });
  }

  obtenerHerramientasPorProyecto(proyectoId: string): Observable<Herramienta[]> {
    return this.http.get<Herramienta[]>(`${this.baseUrl}/proyecto/${proyectoId}`, { headers: this.getAuthHeaders() });
  }

  obtenerHistorialPorHerramienta(herramientaId: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/historial/${herramientaId}`, { headers: this.getAuthHeaders() });
  }

  devolverHerramienta(herramientaId: string): Observable<Herramienta> {
    return this.http.put<Herramienta>(`${this.baseUrl}/devolverHerramienta/${herramientaId}`, {}, { headers: this.getAuthHeaders() });
  }
}
