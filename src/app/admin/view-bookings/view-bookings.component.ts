import { LoginVarService } from './../../services/login-var.service';
import { Component, Input, OnInit } from '@angular/core';
import { FlightsService } from 'src/app/services/flights.service';
import { UserBooking, UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-view-bookings',
  templateUrl: './view-bookings.component.html',
  styleUrls: ['./view-bookings.component.css'],
})
export class ViewBookingsComponent implements OnInit {
  @Input() user: any;
  show = false;
  empty: any;
  bookingList$: any = [];
  flightList$: any = [];
  userFlights: any = [];

  constructor(
    private bookings: UserService,
    private flights: FlightsService,
    public varLogin: LoginVarService
  ) {}

  ngOnInit() {
    this.bookings.getUserBookings().subscribe((val) => {
      this.bookingList$ = val;
    });
    this.flights.getFlights().subscribe((val) => {
      this.flightList$ = val;
    });
  }

  onChange () {
    this.userFlights.length = 0
    for (let x of this.bookingList$) {
      if (x.username == this.user) {
        for (let z of this.flightList$) {
          if (x.flightCode[0] == z.flightCode) {
            this.userFlights.push(z);
          }
        }
      }
    }
    if (this.userFlights.length == 0) 
      this.empty = true;
  }
}
