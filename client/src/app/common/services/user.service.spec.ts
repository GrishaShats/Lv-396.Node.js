import { TestBed, getTestBed, async } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { User } from '../models/user';
import { api } from '../../../environments/environment';

import { UserService } from './user.service';

describe('UserService', () => {
  const dummyUsers: Array<User> = [
    {
      _id: '5cbb6d7ba4908a0db878c37a',
      firstName: 'Hryhorii',
      lastName: 'Shats',
      login: 'grish',
      password: 'weqS@123',
    }
  ];

  let injector: TestBed;
  let service: UserService;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [UserService]
    });
    injector = getTestBed();
    service = injector.get(UserService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    const userService: UserService = TestBed.get(UserService);
    expect(userService)
      .toBeTruthy();
  });

  describe('getUsers()', () => {
    it('should return an Observable<User[]>', () => {
      service.getAll()
        .subscribe(users => {
          expect(users.length)
            .toBe(1);
          expect(users)
            .toEqual(dummyUsers);
      });

      const req = httpMock.expectOne(`${api}users`);
      expect(req.request.method)
        .toBe('GET');
      req.flush(dummyUsers);
    });
  });

  describe('addUser()', () => {
    const taskCreateBody = {
      firstName: 'Test',
      lastName: 'Test',
      login: 'test',
      password: 'weqS@123',
    };

    it('should be method POST', () => {
      service.addUser(taskCreateBody)
        .subscribe(users => users);
      const req = httpMock.expectOne(`${api}auth/signup`);
      expect(req.request.method)
        .toBe('POST');
      req.flush(dummyUsers);

    });
  });
});
