import { Component, OnInit, Output, EventEmitter, TemplateRef } from '@angular/core';
import { FlightsService } from '../services/flights.service';
import { OrigDestAirService } from '../services/orig-dest-air.service';
import { DatePipe } from '@angular/common';
import { LoginVarService } from '../services/login-var.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-flight-list',
  templateUrl: './flight-list.component.html',
  styleUrls: ['./flight-list.component.css'],
  providers: [DatePipe],
})
export class FlightListComponent implements OnInit {
  filterChoice = '';
  filterStatus = '';
  flightIndex!: number;
  filteredList: any = [];
  flights$: any = [];
  flightStat: any = [];
  airlines: any = [];
  orderedFlights: any = [];
  modalRef!: BsModalRef;
  isAdmin: any;

  constructor(
    private flight: FlightsService,
    private airline: OrigDestAirService,
    public varLogin: LoginVarService, private modalService: BsModalService
  ) {}

  flightCode = '';
  loggedInAdmin: any;

  ngOnInit(): void {
    this.isAdmin = localStorage.getItem('admin');
    this.flight.getFlights().subscribe((val) => {
      this.flights$ = val;
    });

    this.flightStat = this.airline.getStatus();
    this.airlines = this.airline.getAirLineFilter();
    this.filterChoice = 'All';
    this.filterStatus = 'All';

    this.loggedInAdmin = localStorage.getItem('admin');
  }

  onChange() {
    this.filteredList.length = 0;
    for (let val of this.flights$) {
      if (this.filterChoice == 'All') this.sortStatus(val);
      else if (val.airline == this.filterChoice) this.sortStatus(val);
    }
  }

  sortStatus(val: any) {
    if (this.filterStatus == 'All') this.filteredList.push(val);
    else if (val.status == this.filterStatus) this.filteredList.push(val);

  }

  openModal (template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  getDepart(flight: any) {
    this.flight.setDepartingFlight(flight);
    console.log(this.flight.getDepartingFlight())
  }
}
