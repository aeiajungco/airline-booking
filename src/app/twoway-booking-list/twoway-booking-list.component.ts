import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-twoway-booking-list',
  templateUrl: './twoway-booking-list.component.html',
  styleUrls: ['./twoway-booking-list.component.css']
})
export class TwowayBookingListComponent implements OnInit {

  @Input() twoWayDep: any = [];
  @Input() twoWayRet: any = [];
  constructor() { }

  ngOnInit(): void {
  }

}
