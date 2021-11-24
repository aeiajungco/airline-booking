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
  
  constructor() { }

  ngOnInit(): void {
    this.depFlight = '';
    this.retFlight = '';
  }

  getDepart(flight: any) {
    this.depFlight = flight;
  }

  getReturn(flight: any) {
    this.retFlight = flight;
  }

  display() {
    console.log('Departing: ' + this.depFlight);
    console.log('Returning: ' + this.retFlight);
  }

}
