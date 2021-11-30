import { LoginVarService } from './../../services/login-var.service';
import { FlightsService } from './../../services/flights.service';
import { UserService } from 'src/app/services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.css']
})
export class ViewUsersComponent implements OnInit {

  public userList$: any = [];
  show = false;
  bookingList$: any = [];
  flightList$: any = [];
  public userFlights: any = [];
  empty = true;

  constructor(private users: UserService, public varLogin: LoginVarService, private flights: FlightsService) { }

  ngOnInit(): void {
    this.users.getUsers().subscribe((val) => {
      this.userList$ = val;
    })
    this.users.getUserBookings().subscribe((val) => {
      this.bookingList$ = val;
    });
    this.flights.getFlights().subscribe((val) => {
      this.flightList$ = val;
    });
  }

  showBookings(username: any) {
    this.userFlights.length = 0;
    this.empty = true;
    this.show = !this.show;
    console.log (this.show);
    for (let x of this.bookingList$) {
      if (x.username == username) {
        for (let z of this.flightList$) {
          if (x.flightCode[0] == z.flightCode) {
            this.userFlights.push(z);
            console.log(z.flightCode);
          }
        }
      }
    }
    if (this.userFlights.length > 0) 
      this.empty = false;
      console.log(this.empty)
  }
  }
