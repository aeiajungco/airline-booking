import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { RegisterComponent } from './register/register.component';
import { BookingListComponent } from './booking-list/booking-list.component';


@NgModule({
  declarations: [
    RegisterComponent,
    BookingListComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule
  ]
})
export class UserModule { }
