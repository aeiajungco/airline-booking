import { Component, OnInit, Output,EventEmitter, SimpleChange} from '@angular/core';
import {Validators, FormBuilder, FormGroup} from '@angular/forms';
import { FlightsService } from '../services/flights.service';
import { OrigDestAirService } from '../services/orig-dest-air.service';
import { DateValidator } from '../date.validator';
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
  matchingList: any = [];
  submitted: boolean = false;
  matched: boolean = false;
  retDateMatched: boolean = false;


  bookForm = this.fb.group ({
    airLine: ['', Validators.required],
    orig: ['', Validators.required],
    dest: ['', Validators.required],
    trip: ['', Validators.required],
    depDate: ['', Validators.required],
    retDate: [''],
  }, {
      validator: DateValidator('depDate', 'retDate')
    });

  public locations: any = [];
  public airlines: any = [];

  constructor(private fb: FormBuilder, private flight: FlightsService, private locair: OrigDestAirService) { } 


  ngOnInit(): void {
    this.flight.getFlights().subscribe((val) => {
      this.flightList$ = val;
    });

    this.locations = this.locair.getLocations();
    this.airlines = this.locair.getAirLine();
  }

  onSubmit() {
    this.submitted = true;
    this.matched = false;
    this.retDateMatched = false;
    this.matchingList.length = 0;


    if (this.selectedTrip == 'trip2' && this.bookForm.value.retDate == null) {
      this.matched = false;
      this.retDateMatched = false;
      this.matchingList.length = 0;
    }
    else {
        for (let val of this.flightList$) {
          if (val.airline == this.selectedAir && val.origin == this.selectedOri && val.destination == this.selectedDes && val.depDate == this.bookForm.value.depDate) {
            this.matchingList.push(val);
            this.matched = true;
          }
        }      

      if (this.bookForm.value.retDate != null) {
        for (let val of this.flightList$) {
          if (val.airline == this.selectedAir && val.origin == this.selectedDes && val.destination == this.selectedOri && val.depDate == this.bookForm.value.retDate) {
            this.matchingList.push(val);
            this.retDateMatched = true;
          }
        }
        if (this.retDateMatched == false) 
          this.matched = false;
      }
    }

    if (this.matched == false && this.retDateMatched == false) {
      this.matched = false;
      this.retDateMatched = false;
      this.matchingList.length = 0;
    }

    console.log(this.retDateMatched);
    console.log(this.matched);
  }

  onChange() {
    if (this.selectedTrip == 'trip1')
      this.bookForm.controls['retDate'].reset();
  }

  get bf() {
    return this.bookForm.controls;
  }
}
