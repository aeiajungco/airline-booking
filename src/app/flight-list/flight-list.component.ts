import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FlightsService } from '../services/flights.service';
import { OrigDestAirService } from '../services/orig-dest-air.service';
import { DatePipe } from '@angular/common';
import { LoginVarService } from '../services/login-var.service';

@Component({
  selector: 'app-flight-list',
  templateUrl: './flight-list.component.html',
  styleUrls: ['./flight-list.component.css'],
  providers: [DatePipe]
})
export class FlightListComponent implements OnInit {
  filterChoice = "";
  filterStatus = "";
  flightIndex!: number;
  filteredList: any = [];
  flights$: any = [];
  public flightStat: any = [];
  public airlines: any = [];
  
  constructor(private flight: FlightsService, private airline: OrigDestAirService, public variable: LoginVarService) {}

  flightCode = '';

  ngOnInit(): void {
    this.flight.getFlights().subscribe((val)=> {
      this.flights$ = val;
    });

    this.flightStat = this.airline.getStatus();
    this.airlines = this.airline.getAirLineFilter();
    this.filterChoice = "All";
    this.filterStatus = "All";
  }

  onChange() {
    console.log(this.variable.getAdmin());
    this.filteredList.length = 0;

    if (this.filterChoice == "All") {
      for(let val of this.flights$) {
        this.sortStatus(val);
      }
    }
    else {
      for (let val of this.flights$) {
        if (val.airline == this.filterChoice) {
          this.sortStatus(val);
        }
      }
    }
  }

  sortStatus (val: any) {
    if (this.filterStatus == 'All') {
    this.filteredList.push(val);
  }
  else if (val.status == this.filterStatus)
    this.filteredList.push(val);
  }

  getFlightCode(flight: any) {
    console.log(flight);
  }
}
