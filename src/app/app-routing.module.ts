import { ErrorPageComponent } from './error-page/error-page.component';
import { ViewUsersComponent } from './admin/view-users/view-users.component';
import { RegisterComponent } from './user/register/register.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { CreateFlightComponent } from './admin/create-flight/create-flight.component';
import { BookFlightComponent } from './book-flight/book-flight.component';
import { FlightListComponent } from './flight-list/flight-list.component';
import { LoginComponent } from './login/login.component';
import { BookingListComponent } from './user/booking-list/booking-list.component';
import { UserHomeComponent } from './user/user-home/user-home.component';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'admin',
    component: AdminHomeComponent,
    canActivate: [AuthGuard],
    children: [
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
      {
        path: 'users',
        component: ViewUsersComponent,
        children: [
          {
            path: 'bookings',
            component: BookingListComponent,
          },
        ],
      },
    ],
  },
  {
    path: 'user',
    component: UserHomeComponent,
    canActivate: [AuthGuard],
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
    ],
  },
  {
    path: '**',
    component: ErrorPageComponent
  },
  {
    path: 'error',
    component: ErrorPageComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
