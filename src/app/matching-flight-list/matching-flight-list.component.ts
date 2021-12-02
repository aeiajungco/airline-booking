import { Component, Input, OnInit } from '@angular/core';
import { FlightsService } from '../services/flights.service';
import * as $ from "jquery";

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
  depIsSelected: boolean = false;
  retIsSelected: boolean = false;  

  constructor(private flight: FlightsService) {}

  ngOnInit(): void {    
  } 

  getDepart(flight: any, i: any) {
    $(".dep-container").eq(i).toggleClass('selected');
    $('button[id^="dep-btn"]').eq(i).text(function(i, text) {
      return text === "UNSELECT" ? "SELECT" : "UNSELECT";
    });

    this.depFlight = flight;
    this.flight.setDepartingFlight(flight);
  }

  getReturn(flight: any, ind: any) {
    $(".ret-container").eq(ind).toggleClass('selected');
    $('button[id^="ret-btn"]').eq(ind).text(function(i, text) {
      return text === "UNSELECT" ? "SELECT" : "UNSELECT";
    });
    this.retFlight = flight;
    this.flight.setReturningFlight(flight);
  }

  display() {
    console.log('Departing: ' + this.flight.getDepartingFlight());
    console.log('Returning: ' + this.flight.getReturningFlight());
  }



}
