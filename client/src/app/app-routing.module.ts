import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { Routes, RouterModule } from '@angular/router';


import { PageComponent } from './page/page.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { LoggedInGuard } from './common/guards/logged-in.guard';
import { LoggedOutGuard } from './common/guards/logged-out.guard';
import { RegistrationComponent } from "./home/registration/registration.component";
import { UpdateComponent } from "./page/update/update.component";


export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, canActivate: [LoggedOutGuard] },
  { path: 'register', component: RegistrationComponent, canActivate: [LoggedOutGuard] },
  {
    path: 'profile',
    component: PageComponent,
    canActivate: [LoggedInGuard]
  },
  {
    path: 'profile/update',
    component: UpdateComponent,
    canActivate: [LoggedInGuard]
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), FormsModule, ReactiveFormsModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
