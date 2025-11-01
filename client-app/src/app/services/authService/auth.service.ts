import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../../store/usuarios/usuarios.state';
import { environment } from '../../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = environment.apiUrl;


  constructor( private  http: HttpClient  ) { }


  login( credentials: {email: string, password: string}):  Observable<{ token: string; message: string, usuario: Usuario }> {
    return this.http.post<{ token: string; message: string, usuario: Usuario }>(`${this.baseUrl}/auth/login`, credentials);
  }




}
