import { LoginVarService } from './../../services/login-var.service';
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
  un = '';
  noBookingUser = '';
  empty: any;
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

  showBookings(username: any) {
    this.un = ''
    this.show = !this.show;

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
          console.log("PASSED BY");
        }
        else if (username != this.userWithBookings[i] && i+1 == this.userWithBookings.length) {
          this.userWithBookings.push(username);
          console.log("PASSED BY");
        }
        if (username == this.userWithBookings[i]) {
          this.noBookingUser = this.userWithBookings[i];
          console.log("PASSED BY");
        }
      }
   }
  }
}