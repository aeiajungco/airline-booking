import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { FlightsService } from 'src/app/flights.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';

interface Flight {
  $key: string;
  destination: string;
  origin: string;
  depTime: any;
  arrTime: any;
  type: string;
  flightCode: string;
  flightPrice: number;
  airline: string;
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
    const payload: Flight = {
      $key: '',
      destination: this.info.destination.value,
      origin: this.info.origin.value,
      depTime: this.info.depTime.value,
      arrTime: this.info.arrTime.value,
      type: this.info.type.value,
      flightCode: this.info.flightCode.value,
      flightPrice: this.info.flightPrice.value,
      airline: this.info.airline.value,
    }

    this.flights.addFlight(payload);
  }

  get info () {
    return this.form.controls;
  }
}
