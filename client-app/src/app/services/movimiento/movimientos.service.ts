import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Movimiento } from '../../store/movimientos/movimiento.state';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovimientosService {
  private baseUrl = 'http://localhost:3000/api/movimientos';

    protected getAuthHeaders() {
    const token = sessionStorage.getItem('token');
    return { Authorization: `Bearer ${token}` };
  }

  // Aquí puedes agregar métodos para interactuar con la API de movimientos
  // Por ejemplo, obtener el historial de movimientos, agregar un nuevo movimiento, etc.
  constructor(private http: HttpClient) { }

  //Este metodo tiene que traer todos los moviemientos en base de datos
  obtenerHistorialPorHerramienta(herramientaId: string): Observable<Movimiento[]> {
    return this.http.get<Movimiento[]>(`${this.baseUrl}/historial/${herramientaId}`);
  }

  // Para devolver una herramienta
  devolverHerramienta(herramientaId: string, fechaDevolucion: string, estado: string, empleadoAsignado: string | null, proyectoAsignado: string | null): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/devolver/${herramientaId}`, { fechaDevolucion, estado, empleadoAsignado, proyectoAsignado }, { headers: this.getAuthHeaders() });
  }

}
