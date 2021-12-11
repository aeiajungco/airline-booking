import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookFlightComponent } from '../book-flight/book-flight.component';
import { FlightListComponent } from '../flight-list/flight-list.component';
import { BookingListComponent } from '../user/booking-list/booking-list.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { CreateFlightComponent } from './create-flight/create-flight.component';
import { ViewUsersComponent } from './view-users/view-users.component';

const routes: Routes = [
  {
    path: '',
    component: AdminHomeComponent
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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
