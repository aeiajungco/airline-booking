import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { CreateFlightComponent } from './create-flight/create-flight.component';
import { ViewBookingsComponent } from './view-bookings/view-bookings.component';
import { UserListComponent } from './user-list/user-list.component';
import { CancelFlightComponent } from './cancel-flight/cancel-flight.component';


@NgModule({
  declarations: [
    AdminHomeComponent,
    CreateFlightComponent,
    ViewBookingsComponent,
    UserListComponent,
    CancelFlightComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
