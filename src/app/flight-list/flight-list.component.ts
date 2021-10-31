import { Component, OnInit, Input } from '@angular/core';
import { FlightsService } from '../services/flights.service';

@Component({
  selector: 'app-flight-list',
  templateUrl: './flight-list.component.html',
  styleUrls: ['./flight-list.component.css']
})
export class FlightListComponent implements OnInit {

  flights$: any = [];
  constructor(private flight: FlightsService) { }

  ngOnInit(): void {
    this.flight.getFlights().subscribe((val)=> {
      this.flights$ = val;
    });
  }


}
