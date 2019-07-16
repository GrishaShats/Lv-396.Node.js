import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { User } from '../models/user';
import { JwtHelperService } from '@auth0/angular-jwt';
import { api } from '../../../environments/environment';
import { UpdateUser } from '../models/update-user';

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

  getUser(id?: string, required?: boolean): Observable<User> {
    const userId = this.getUserId();

    return this.http.get<any>(`${api}users/${id || userId}`, httpOptions)
      .pipe(tap(res => {
          this.user = res;
          this.currentUser(required, this.user);
        })
      );
  }

  addUser(user: User): Observable<any> {
    return this.http.post<User>(`${api}auth/signup`, user, httpOptions);
  }

  getUserId(): any {
    if (localStorage.token) {
      return this.helper.decodeToken(localStorage.token).id;
    }
  }

  deleteUser(id: string): Observable<any> {
    const deleteOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }),
      body: {id}
    };

    return this.http.delete(`${api}users/`, deleteOptions);
  }

  updateUser(user: User): Observable<any> {
    const updateUser = new UpdateUser();
    updateUser.mapUser(user);

    return this.http.put<User>(`${api}users`, updateUser, httpOptions);
  }

  currentUser(required: boolean, data: User): void {
    if (!required) {
      this.takeUser.next(data);
    }
  }
}
