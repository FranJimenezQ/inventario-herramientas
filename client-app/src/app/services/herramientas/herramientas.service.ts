import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Herramienta } from '../../store/herramientas/herramientas.state';

@Injectable({
  providedIn: 'root'
})
export class HerramientasService {

  private baseUrl = 'http://localhost:3000/api/herramientas';

  constructor( private http: HttpClient) { }

  getHerramientas(): Observable<Herramienta[]> {
    return this.http.get<Herramienta[]>(`${this.baseUrl}`);
  }

  crearHerramienta(herramienta: Herramienta): Observable<Herramienta> {
    return this.http.post<Herramienta>(`${this.baseUrl}/registrarHerramienta`, herramienta);
  }

  actualizarHerramienta(id: string, herramienta: Herramienta): Observable<Herramienta> {
    return this.http.put<Herramienta>(`${this.baseUrl}/actualizarHerramienta/${id}`, herramienta);
  }

  eliminarHerramienta(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/eliminarHerramienta/${id}`);
  }

  asignarHerramienta(id: string, proyectoId: string): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/asignarHerramienta/${id}`, { proyectoId });
  }

  obtenerHerramientasPorProyecto(proyectoId: string): Observable<Herramienta[]> {
    return this.http.get<Herramienta[]>(`${this.baseUrl}/proyecto/${proyectoId}`);
  }

  obtenerHistorialPorHerramienta(herramientaId: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/historial/${herramientaId}`);
  }

  devolverHerramienta(herramientaId: string): Observable<Herramienta> {
    return this.http.put<Herramienta>(`${this.baseUrl}/devolverHerramienta/${herramientaId}`, {});
  }
}
