import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { User } from '../models/user';
import { JwtHelperService } from '@auth0/angular-jwt';
import { api } from '../../../environments/environment';

export const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('token')}`
  })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private readonly http: HttpClient) {
  }

  user: User;
  helper = new JwtHelperService();

  public takeUser: BehaviorSubject<User> = new BehaviorSubject({});

  public getUser(id?: string, required?: boolean): Observable<User> {
    const userId = this.getUserId();

    return this.http.get<any>(`${api}users/${id || userId}`, httpOptions)
      .pipe(tap(res => {
          this.user = res;
          this.currentUser(required, this.user);
        })
      );
  }

  public getAll(): Observable<User[]> {
    return this.http.get<User[]>(`${api}users`, httpOptions);
  }


  public addUser(user: User): Observable<any> {
    return this.http.post<User>(`${api}auth/signup`, user, httpOptions);
  }

  public getUserId(): any {
    if (localStorage.token) {
      return this.helper.decodeToken(localStorage.token).id;
    }
  }

  public currentUser(required: boolean, data: User): void {
    if (!required) {
      this.takeUser.next(data);
    }
  }
}
