import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-oneway-booking-list',
  templateUrl: './oneway-booking-list.component.html',
  styleUrls: ['./oneway-booking-list.component.css']
})
export class OnewayBookingListComponent implements OnInit {

  @Input() oneWay: any = [];

  constructor() { }

  ngOnInit(): void {
  }

}
