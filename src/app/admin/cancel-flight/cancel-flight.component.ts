import { LoginVarService } from './../../services/login-var.service';
import { Component, Input, OnInit } from '@angular/core';
import { FlightsService } from 'src/app/services/flights.service';

@Component({
  selector: 'app-cancel-flight',
  templateUrl: './cancel-flight.component.html',
  styleUrls: ['./cancel-flight.component.css']
})
export class CancelFlightComponent implements OnInit {

  @Input() flightCode: any; 
  @Input() status: any;

  flights$: any = [];
    

  constructor(private flight: FlightsService) { }

  ngOnInit(): void {
    this.flight.getFlights().subscribe((val) => {
      this.flights$ = val;
    });

  }

  cancelFlight() {
    for (let x of this.flights$) {
      if (x.flightCode == this.flightCode) {
        this.flight.cancelFLight(x.$key, 'Cancelled');
      }
    }
  }
  
}
