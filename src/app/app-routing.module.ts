import { RegisterComponent } from './user/register/register.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { CreateFlightComponent } from './admin/create-flight/create-flight.component';
import { AppComponent } from './app.component';
import { BookFlightComponent } from './book-flight/book-flight.component';
import { FlightListComponent } from './flight-list/flight-list.component';
import { LoginComponent } from './login/login.component';
import { BookingListComponent } from './user/booking-list/booking-list.component';
import { UserHomeComponent } from './user/user-home/user-home.component';

const routes: Routes = [
  {
    path: '',
    component: AppComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'admin',
    component: AdminHomeComponent,
    children: [
      // {
      //   path: '',
      //   redirectTo: 'admin',
      // },
      {
        path: 'book',
        component: BookFlightComponent,
      },
      {
        path: 'create',
        component: CreateFlightComponent,
      },
      {
        path: 'flights',
        component: FlightListComponent,
      },
    ],
  },
  {
    path: 'user',
    component: UserHomeComponent,
    children: [
      {
        path: 'home',
        component: UserHomeComponent,
      },
      {
        path: 'book',
        component: BookFlightComponent,
      },
      {
        path: 'flights',
        component: FlightListComponent,
      },
      {
        path: 'bookings',
        component: BookingListComponent,
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
