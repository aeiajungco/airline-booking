import { UserHomeComponent } from './user-home/user-home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookFlightComponent } from '../book-flight/book-flight.component';
import { LogoutComponent } from '../logout/logout.component';
import { FlightListComponent } from '../flight-list/flight-list.component';
import { BookingListComponent } from './booking-list/booking-list.component';
import { AppComponent } from '../app.component';

const routes: Routes = [ 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
