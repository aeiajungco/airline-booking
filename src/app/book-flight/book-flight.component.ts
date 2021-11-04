import { Component, OnInit, Output,EventEmitter, SimpleChange} from '@angular/core';
import {Validators, FormBuilder, FormGroup} from '@angular/forms';
import { FlightsService } from '../services/flights.service';
import { OrigDestAirService } from '../services/orig-dest-air.service';

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
  matched: number = 0;
  retDateMatched: number = 0;


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
    this.matched = 0;
    this.retDateMatched = 0;
    this.matchingList.length = 0;


    if (this.selectedTrip == 'trip2' && this.bookForm.value.retDate == null) {
      this.matched = 0;
      this.retDateMatched = 0;
      this.matchingList.length = 0;
    }
    else {
      if (this.bookForm.value.retDate == '' || this.bookForm.value.retDate != '') {
        for (let val of this.flightList$) {
          if (val.airline == this.selectedAir && val.origin == this.selectedOri && val.destination == this.selectedDes && val.depDate == this.bookForm.value.depDate) {
            this.matchingList.push(val);
            this.matched++;
          }
        }
      }

      if (this.bookForm.value.retDate != '') {
        for (let val of this.flightList$) {
          if (val.airline == this.selectedAir && val.origin == this.selectedDes && val.destination == this.selectedOri && val.depDate == this.bookForm.value.retDate) {
            this.matchingList.push(val);
            this.retDateMatched++;
          }
        }
      }
    }

    if (this.matched == 0 && this.retDateMatched == 0) {
      this.matched = 0;
      this.retDateMatched = 0;
      this.matchingList.length = 0;
    }

    console.log(this.bookForm.value.retDate)
  }

  onChange() {
    if (this.selectedTrip == 'trip1')
      this.bookForm.controls['retDate'].reset();
  }

  get bf() {
    return this.bookForm.controls;
  }
}
