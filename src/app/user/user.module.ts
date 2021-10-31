import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { RegisterComponent } from './register/register.component';
import { BookingListComponent } from './booking-list/booking-list.component';
import { UserHomeComponent } from './user-home/user-home.component';


@NgModule({
  declarations: [
    RegisterComponent,
    BookingListComponent,
    UserHomeComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule
  ]
})
export class UserModule { }
