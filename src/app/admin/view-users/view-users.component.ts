import { LoginVarService } from './../../services/login-var.service';
import { UserService } from 'src/app/services/user.service';
import { Component, OnInit } from '@angular/core';
import * as $ from "jquery";

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
  un = '';
  noBookingUser = '';
  empty: any;
  showClick = 0;
  userWithBookings: any = [];
  isActive!: boolean;

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

  showBookings(username: any, i: any) {
    this.un = ''
    this.show = !this.show;
    this.showClick++;

    if (this.showClick == 1) {
      $('#view-btn'+i).html('Hide Bookings');
    }
    else {
      $('button[id^="view-btn"]').html('View Bookings');
      $('#view-btn'+i).html('View Bookings');
      this.showClick = 0;
    }

    for (let x of this.bookingList$) {
      if (username == x.username) {
        this.un = x.username;
        this.empty = false;
        break;
      }
    }
    console.log(this.un);

    if (this.un == '') {
      console.log("EMPTY");
      this.empty = true;
      for (let i = 0; i <= this.userWithBookings.length; i++) {
        if(this.userWithBookings.length == 0) {
          this.userWithBookings.push(username);
        }
        else if (username != this.userWithBookings[i] && i+1 == this.userWithBookings.length) {
          this.userWithBookings.push(username);
        }
        if (username == this.userWithBookings[i]) {
          this.noBookingUser = this.userWithBookings[i];
        }
      }
   }
  }
}