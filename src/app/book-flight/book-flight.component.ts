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
  //@Output() matchedList = new EventEmitter<any>();

  constructor(private fb: FormBuilder, private flight: FlightsService, private locair: OrigDestAirService) { } 


  ngOnInit(): void {
    this.flight.getFlights().subscribe((val) => {
      this.flightList$ = val;
    });

    this.locations = this.locair.getLocations();
    this.airlines = this.locair.getAirLine();
  }

  onSubmit() {
    //this.matchedList.emit(this.matchingList);
    this.submitted = true;
    this.matched = 0;
    this.matchingList.length = 0;

    for (let val of this.flightList$) {
      if (val.airline == this.selectedAir && val.origin == this.selectedOri && val.destination == this.selectedDes) {
        this.matchingList.push(val);
        this.matched++;
      }
    }
    if (this.matched == 0) {
      this.matched = 0;
      this.matchingList.length = 0;
    }
  }

  get bf() {
    return this.bookForm.controls;
  }
}
