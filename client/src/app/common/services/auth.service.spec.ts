import { TestBed, async, inject } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { api } from '../../../environments/environment';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from './auth.service';
import { throwError } from 'rxjs';

describe('AuthService', () => {
  let httpTestingController: HttpTestingController;
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule, FormsModule, RouterTestingModule, ReactiveFormsModule],
      providers: [AuthService]
    });
    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(AuthService);
  });

  it('should be created', () => {
    const service: AuthService = TestBed.get(AuthService);
    expect(service)
      .toBeTruthy();
  });
});
