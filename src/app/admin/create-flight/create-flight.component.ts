import { OrigDestAirService } from './../../services/orig-dest-air.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { FlightsService } from 'src/app/services/flights.service';

interface Flight {
  $key: string;
  destination: string;
  origin: string;
  depDate: Date;
  depTime: any;
  arrTime: any;
  type: string;
  flightCode: string;
  flightPrice: number;
  airline: string;
  status: string;
}

@Component({
  selector: 'app-create-flight',
  templateUrl: './create-flight.component.html',
  styleUrls: ['./create-flight.component.css']
})

export class CreateFlightComponent implements OnInit {

  form = this.fb.group ({
    $key: [''],
    destination: ['', Validators.required],
    origin: ['', Validators.required],
    depDate: ['', Validators.required],
    depTime: ['', Validators.required],
    arrTime: ['', Validators.required],
    type: ['', Validators.required],
    flightCode: ['', Validators.required],
    flightPrice: ['', Validators.required],
    airline: ['', Validators.required],
  })

  public locations: any = [];
  public airlines: any = [];

  constructor(private fb: FormBuilder, private flights: FlightsService, private option: OrigDestAirService) { }

  ngOnInit(): void {

    this.locations = this.option.getLocations();
    this.airlines = this.option.getAirLine();
  }

  onSubmit () {
    const flightInfo: Flight = {
      $key: '',
      destination: this.info.destination.value,
      origin: this.info.origin.value,
      depDate: this.info.depDate.value,
      depTime: this.info.depTime.value,
      arrTime: this.info.arrTime.value,
      type: this.info.type.value,
      flightCode: this.info.flightCode.value,
      flightPrice: this.info.flightPrice.value,
      airline: this.info.airline.value,
      status: 'Available',
    }

    this.flights.addFlight(flightInfo);
    this.form.reset();
  }

  get info () {
    return this.form.controls;
  }
}
