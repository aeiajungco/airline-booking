import { BookingListComponent } from './../../user/booking-list/booking-list.component';
import { LoginVarService } from './../../services/login-var.service';
import { FlightsService } from './../../services/flights.service';
import { UserService } from 'src/app/services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.css'],
})
export class ViewUsersComponent implements OnInit {
  userList$: any = [];
  bookingList$: any = [];
  button = 'View'
  show = false;
  flightList$: any = [];
  un = ''
  empty: any;

  constructor(
    private users: UserService,
    public varLogin: LoginVarService,
  ) {}

  ngOnInit(): void {
    this.users.getUsers().subscribe((val) => {
      this.userList$ = val
    });
    this.users.getUserBookings().subscribe((val) => {
      this.bookingList$ = val
    });

  }

  showBookings(username: any) {
    this.un = ''
    this.show = !this.show;
    for (let x of this.bookingList$) {
      if (username == x.username) {
        this.un = x.username
        this.empty = false
        break;
      }
    }
    if (this.show == false)
      this.button = 'View'
    else if (this.show == true)
      this.button = 'Hide'
  }
}
