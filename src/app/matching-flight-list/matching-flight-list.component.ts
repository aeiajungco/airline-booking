import { Component, Input, OnInit } from '@angular/core';
import { FlightsService } from '../services/flights.service';

@Component({
  selector: 'app-matching-flight-list',
  templateUrl: './matching-flight-list.component.html',
  styleUrls: ['./matching-flight-list.component.css']
})
export class MatchingFlightListComponent implements OnInit {

  @Input() departingFlight: any = [];
  @Input() returningFlight: any = [];
  depFlight = '';
  retFlight = '';
  retIsSelected: boolean = false;  

  constructor(private flight: FlightsService) {}

  ngOnInit(): void {    
  } 

  getDepart(flight: any) {    
    this.depFlight = flight;
    this.flight.setDepartingFlight(flight);
  }

  getReturn(flight: any) {
    this.retFlight = flight;
    this.flight.setReturningFlight(flight);
  }

  display() {
    console.log('Departing: ' + this.flight.getDepartingFlight());
    console.log('Returning: ' + this.flight.getReturningFlight());
  }



}
