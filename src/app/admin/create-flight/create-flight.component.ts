import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { FlightsService } from 'src/app/flights.service';

@Component({
  selector: 'app-create-flight',
  templateUrl: './create-flight.component.html',
  styleUrls: ['./create-flight.component.css']
})
export class CreateFlightComponent implements OnInit {

  createFlight = this.fb.group ({
    destination: ['', Validators.required],
    origin: ['', Validators.required],
    depTime: ['', Validators.required],
    arrTime: ['', Validators.required],
    type: ['', Validators.required],
    flightCode: ['', Validators.required],
    flightPrice: ['', Validators.required],
    airline: ['', Validators.required],
  })

  constructor(private fb: FormBuilder, private flights: FlightsService) { }

  ngOnInit(): void {
  }

  onSubmit () {
    const flight = {
      destination: this.info.destination.value,
      origin: this.info.origin.value,
      depTime: this.info.depTime.value,
      arrTime: this.info.arrTime.value,
      type: this.info.type.value,
      flightCode: this.info.flightCode.value,
      flightPrice: this.info.flightPrice.value,
      airline: this.info.airline.value,
    }
  }

  get info () {
    return this.createFlight.controls;
  }
}
