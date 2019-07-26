import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs/Rx';
import { api } from '../../../environments/environment';
import { httpOptions } from './user.service';
import { TaskCreateRequestBody, TaskEditRequestBody } from '../models/task';
import { Task } from '../models/task';
import { tap } from 'rxjs/internal/operators';


@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private readonly http: HttpClient) { }
  tasks: Task[];

  public takeUserTasks: BehaviorSubject<Task[]> = new BehaviorSubject([]);

  public getUserTasks(id: string): Observable < Task[] > {
    return this.http.get<Task[]>(`${api}issues?userId=${id}`, httpOptions)
      .pipe(tap(res => {
        this.tasks = res.map((item: any) =>
          ({
            id: item._id,
            name: item.name,
            author: item.author,
            sharedFrom: item.sharedFrom,
            sharedTo: item.sharedTo,
          })
        );
        this.takeUserTasks.next(this.tasks);
      }));
  }

  public editTask(requestBody: TaskEditRequestBody): Observable< any > {
    return this.http.put<TaskEditRequestBody>(`${api}/issues`, requestBody, httpOptions);
  }

  public createTask(requestBody: TaskCreateRequestBody): Observable < any > {
    return this.http.post<TaskCreateRequestBody>(`${api}issues`, requestBody, httpOptions);
  }

  public deleteTask(id: string): Observable < any > {
    const deleteOptions = {...httpOptions, body: {id}};

    return this.http.delete(`${api}issues`, deleteOptions);
  }

}
