import { Injectable } from '@angular/core';
import { AppState } from '../../store/appState';
import { Usuario } from '../../store/usuarios/usuarios.state';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  //private usuarios: Usuario[] = [];
  private baseUrl = `${environment.apiUrl}/auth`;
  constructor(private http: HttpClient) { }
  protected getAuthHeaders() {
    const token = sessionStorage.getItem('token');
    return { Authorization: `Bearer ${token}` };
  }

  obtenerUsuarios() {
    return this.http.get<Usuario[]>(`${this.baseUrl}/obtenerUsuarios`, { headers: this.getAuthHeaders() });
  }

  registrarUsuario(usuario: Usuario) {
    return this.http.post<Usuario>(`${this.baseUrl}/registrarUsuario`, usuario, { headers: this.getAuthHeaders() });
  }

  actualizarUsuario(_id: string, usuario: Usuario) {
    return this.http.put<Usuario>(`${this.baseUrl}/actualizarUsuario/${_id}`, usuario, { headers: this.getAuthHeaders() });
  }

  eliminarUsuario(_id: string) {
    return this.http.delete<void>(`${this.baseUrl}/eliminarUsuario/${_id}`, { headers: this.getAuthHeaders() });
  }
}
