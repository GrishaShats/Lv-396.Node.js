import { TestBed, getTestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { TaskService } from './task.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MockBackend } from '@angular/http/testing';
import { Http, ConnectionBackend, BaseRequestOptions, Response, ResponseOptions } from '@angular/http';
import { Task } from '../models/task';
import { HttpClientModule } from '@angular/common/http';
import { api } from '../../../environments/environment';

describe('TaskService', () => {
  const mockTasks: Array<Task> = [
    {
      id: '0',
      name: 'Task name1',
      author: { _id: '1', firstName: 'Grisha', lastName: 'Shats' },
      sharedFrom: { _id: '2', firstName: 'Nerdy', lastName: 'Soft' },
      sharedTo: { _id: '3', firstName: 'Some', lastName: 'Name' },
    },
    {
      id: '1',
      name: 'Task name2',
      author: { _id: '1', firstName: 'Grisha', lastName: 'Shats' },
      sharedFrom: { _id: '2', firstName: 'Nerdy', lastName: 'Soft' },
      sharedTo: { _id: '3', firstName: 'Some', lastName: 'Name' },
    },
    {
      id: '2',
      name: 'Task name3',
      author: { _id: '1', firstName: 'Grisha', lastName: 'Shats' },
      sharedFrom: { _id: '2', firstName: 'Nerdy', lastName: 'Soft' },
      sharedTo: { _id: '3', firstName: 'Some', lastName: 'Name' },
    },
    {
      id: '3',
      name: 'Task name4',
      author: { _id: '1', firstName: 'Grisha', lastName: 'Shats' },
      sharedFrom: { _id: '2', firstName: 'Nerdy', lastName: 'Soft' },
      sharedTo: { _id: '3', firstName: 'Some', lastName: 'Name' },
    }];
  let injector: TestBed;
  let service: TaskService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TaskService],
      imports: [HttpClientModule, HttpClientTestingModule]
    });
    injector = getTestBed();
    service = injector.get(TaskService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    const taskService: TaskService = TestBed.get(TaskService);
    expect(taskService)
      .toBeTruthy();
  });

  describe('getUsersTasks()', () => {
    it('should return an Observable<Task[]>', () => {
      service.getUserTasks('1')
        .subscribe(tasks => {
          expect(tasks.length)
            .toBe(4);
          expect(tasks)
            .toEqual(mockTasks);
        });

      const req = httpMock.expectOne(`${api}issues?userId=1`);
      expect(req.request.method)
        .toBe('GET');
      req.flush(mockTasks);
    });
  });

  describe('createTask()', () => {
    const taskCreateBody = {
      name: 'Task name',
      author: { _id: '1', firstName: 'Grisha', lastName: 'Shats' },
    };

    it('should be method POST', () => {
      service.createTask(taskCreateBody)
        .subscribe(tasks => tasks);
      const req = httpMock.expectOne(`${api}issues`);
      expect(req.request.method)
        .toBe('POST');
      req.flush(mockTasks);

    });
  });

  describe('deleteTask()', () => {
    it('should be method DELETE', () => {
      service.deleteTask('1')
        .subscribe(tasks => tasks);
      const req = httpMock.expectOne(`${api}issues`);
      expect(req.request.method)
        .toBe('DELETE');
      req.flush(mockTasks);
    });
  });

  describe('editTask()', () => {
    const taskEditBody = {
      id: '1',
      name: 'Task name1',
      sharedFrom: 'Nerdy',
      sharedTo: 'Some'
    };

    it('should be method PUT', () => {
      service.editTask(taskEditBody)
        .subscribe(tasks => tasks);
      const req = httpMock.expectOne(`${api}/issues`);
      expect(req.request.method)
        .toBe('PUT');
      req.flush(mockTasks);
    });
  });
});
