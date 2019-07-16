import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { api } from '../../../environments/environment';
import { Observable } from "rxjs/Rx";

@Injectable()
export class AuthService {
  constructor(private readonly http: HttpClient) { }

  auth(login: string, password: string): Observable<object> {
    return this.http.post(`${api}auth/login`, {
      login,
      password
    })
  }

  logout(): any {
    localStorage.clear();
  }

  getUser(): any {
    return localStorage.getItem('token');
  }
}

export const AUTH_PROVIDERS: Array<any> = [
  { provide: AuthService, useClass: AuthService }
];
