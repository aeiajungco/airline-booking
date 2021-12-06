import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { BookingListComponent } from './booking-list/booking-list.component';
import { UserHomeComponent } from './user-home/user-home.component';


@NgModule({
  declarations: [
    UserHomeComponent,
    BookingListComponent,    
  ],
  imports: [
    CommonModule,
    UserRoutingModule
  ]
})
export class UserModule { }
