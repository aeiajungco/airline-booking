import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { CreateFlightComponent } from './admin/create-flight/create-flight.component';
import { AppComponent } from './app.component';
import { BookFlightComponent } from './book-flight/book-flight.component';
import { LogoutComponent } from './logout/logout.component';
import { UserHomeComponent } from './user/user-home/user-home.component';

const routes: Routes = [
  {
    path: '',
    component: AppComponent,
  },
  {
    path: 'admin',
    component: AdminHomeComponent,
    children: [
      {
        path: 'home',
        component: AdminHomeComponent,
      },
      {
        path: 'book',
        component: BookFlightComponent,
      },
      {
        path: 'create',
        component: CreateFlightComponent,
      },
      {
        path: 'logout',
        component: AppComponent,
      },
    ],
  },
  {
    path: 'user',
    component: UserHomeComponent,
    children: [
      {
        path: 'book',
        component: BookFlightComponent,
      },
      {
        path: 'logout',
        component: AppComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
