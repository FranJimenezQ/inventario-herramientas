import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:3000/api';


  constructor( private  http: HttpClient  ) { }


  login( credentials: {email: string, password: string}):  Observable<{ token: string; message: string }> {
    return this.http.post<{ token: string; message: string }>(`${this.baseUrl}/auth/login`, credentials);
  }




}
