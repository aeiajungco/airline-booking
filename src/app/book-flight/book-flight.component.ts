import { Component, OnInit, SimpleChange} from '@angular/core';
import {FormGroup, Validators, FormBuilder} from '@angular/forms';
import { FlightsService } from '../services/flights.service';
import { OrigDestAirService } from '../services/orig-dest-air.service';

interface Destination {
  value: string;
  viewValue: string;
}

interface Airline {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-book-flight',
  templateUrl: './book-flight.component.html',
  styleUrls: ['./book-flight.component.css']
})
export class BookFlightComponent implements OnInit {
  
  selectedDes = "";
  selectedOri = "";
  selectedAir = "";
  selectedTrip ="";
  flightList$: any = [];
  submitted: boolean = false;
  matched: number = 0;


  bookForm = this.fb.group ({
    airLine: ['', Validators.required],
    orig: ['', Validators.required],
    dest: ['', Validators.required],
    trip: ['', Validators.required],
    depDate: ['', Validators.required],
    retDate: [''],
  });

  public locations: any = [];
  public airlines: any = [];

  constructor(private fb: FormBuilder, private flight: FlightsService, private loc: OrigDestAirService, private air: OrigDestAirService) { } 

  ngOnInit(): void {
    this.flight.getFlights().subscribe((val) => {
      this.flightList$ = val;
    });

    this.locations = this.loc.getLocations();
    this.airlines = this.air.getAirLine();
  }

  onSubmit() {
    this.submitted = true;
    this.matched = 0;
    for (let val of this.flightList$) {
      if (val.airline == this.bookForm.value.airLine && val.origin == this.bookForm.value.orig && val.destination == this.bookForm.value.dest)
        this.matched++;
    }
    if (this.matched == 0)
      this.matched = 0;
  }

  get airLine() {
    return this.bookForm.controls['airLine'];
  }

  get orig() {
    return this.bookForm.controls['orig'];
  }

  get dest() {
    return this.bookForm.controls['dest'];
  }

  get trip() {
    return this.bookForm.controls['trip'];
  }

  get depDate() {
    return this.bookForm.controls['depDate'];
  }

  get retDate() {
    return this.bookForm.controls['retDate'];
  }

}
