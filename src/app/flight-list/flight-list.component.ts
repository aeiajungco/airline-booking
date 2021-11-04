import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FlightsService } from '../services/flights.service';
import { OrigDestAirService } from '../services/orig-dest-air.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-flight-list',
  templateUrl: './flight-list.component.html',
  styleUrls: ['./flight-list.component.css'],
  providers: [DatePipe]
})
export class FlightListComponent implements OnInit {
  filterChoice = "";
  flightIndex!: number;
  filteredList: any = [];
  flights$: any = [];
  public airlines: any = [];
  
  constructor(private flight: FlightsService, private airline: OrigDestAirService, private datePipe: DatePipe) {}

  flightCode = '';

  ngOnInit(): void {
    this.flight.getFlights().subscribe((val)=> {
      this.flights$ = val;
    });

    this.airlines = this.airline.getAirLineFilter();
  }

  onChange() {
    this.filteredList.length = 0;

    if (this.filterChoice == "All") {
      for(let val of this.flights$)
        this.filteredList.push(val);
    }
    else {
      for (let val of this.flights$) {
        if (val.airline == this.filterChoice)
          this.filteredList.push(val);
      }
    }
  }

  getFlightCode(flight: any) {
    console.log(flight);
  }
}
