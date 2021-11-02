import { Component, Input, OnInit } from '@angular/core';
import { FlightsService } from '../services/flights.service';

@Component({
  selector: 'app-matching-flight-list',
  templateUrl: './matching-flight-list.component.html',
  styleUrls: ['./matching-flight-list.component.css']
})
export class MatchingFlightListComponent implements OnInit {

  @Input() matchingList: any = [];
  
  constructor() { }

  ngOnInit(): void {

  }

}
