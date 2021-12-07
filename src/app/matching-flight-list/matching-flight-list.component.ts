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
  @Input() selectedTrip: any;
  depFlight: any;
  retFlight: any;
  trip!: boolean;
  depClick = 0;
  retClick = 0;

  constructor(private flight: FlightsService) {}

  ngOnInit(): void {    
    if(this.selectedTrip == 'trip1')
      this.trip = true;
    else
      this.trip = false;
  } 

  getDepart(flight: any, i: any) {
    this.depClick++;

    $(".dep-container").eq(i).toggleClass('selected');
    $('button[id^="dep-btn"]').eq(i).text(function(i, text) {
      return text === "UNSELECT" ? "SELECT" : "UNSELECT";
    });

    if (this.depClick == 2) {
      this.depClick = 0;
      $('button[id^="dep-btn"]').prop("disabled", false);
      this.flight.removeDepFlight();
      this.depFlight = null;
    }
    else {
      $('button[id^="dep-btn"]').not('#dep-btn'+i).prop("disabled", true);
      this.depFlight = flight;
      this.flight.setDepartingFlight(flight);
    }
    
  }

  getReturn(flight: any, ind: any) {
    this.retClick++;
    
    $(".ret-container").eq(ind).toggleClass('selected');
    $('button[id^="ret-btn"]').eq(ind).text(function(i, text) {
      return text === "UNSELECT" ? "SELECT" : "UNSELECT";
    });
    
    if (this.retClick == 2) {
      this.retClick = 0;
      this.trip = false;
      $('button[id^="ret-btn"]').prop("disabled", false);
      this.flight.removeRetFlight();
      this.retFlight = null;
    }
    else {
      $('button[id^="ret-btn"]').not('#ret-btn'+ind).prop("disabled", true);
      this.trip = true;
      this.retFlight = flight;
      this.flight.setReturningFlight(flight);
    }

    
  }

  display() {
    console.log('Departing: ' + this.flight.getDepartingFlight());
    console.log('Returning: ' + this.flight.getReturningFlight());
  }



}
