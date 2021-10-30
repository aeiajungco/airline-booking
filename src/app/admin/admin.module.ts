import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { CreateFlightComponent } from './create-flight/create-flight.component';
import { ViewBookingsComponent } from './view-bookings/view-bookings.component';
import { UserListComponent } from './user-list/user-list.component';


@NgModule({
  declarations: [
    AdminHomeComponent,
    CreateFlightComponent,
    ViewBookingsComponent,
    UserListComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
