import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TokenInterceptor } from './common/interfaces/token.interceptor';

import { AccordionModule } from 'ngx-bootstrap/accordion';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { AUTH_PROVIDERS } from './common/services/auth.service';

import { LoggedInGuard } from './common/guards/logged-in.guard';
import { LoggedOutGuard } from './common/guards/logged-out.guard';

import { PageComponent } from './page/page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { RegistrationComponent } from './home/registration/registration.component';
import { HttpModule } from '@angular/http';
import { TaskListComponent } from './page/task-list/task-list.component';
import { TaskItemComponent } from './page/task-list/task-item/task-item.component';
import { CreateTaskComponent } from './page/create-task/create-task.component';
import { ModalTaskComponent } from './page/modal-task/modal-task.component';

@NgModule({
  declarations: [
    AppComponent,
    PageComponent,
    HomeComponent,
    PageNotFoundComponent,
    RegistrationComponent,
    TaskListComponent,
    TaskItemComponent,
    CreateTaskComponent,
    ModalTaskComponent,
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BsDropdownModule.forRoot(),
    AccordionModule.forRoot(),
    HttpModule,
    HttpClientModule,
    ModalModule.forRoot(),
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot() // ToastrModule added
  ],
  providers: [
    AUTH_PROVIDERS,
    LoggedInGuard,
    LoggedOutGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
