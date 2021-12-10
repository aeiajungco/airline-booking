import { UserService } from 'src/app/services/user.service';
import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { FlightsService } from '../services/flights.service';
import { OrigDestAirService } from '../services/orig-dest-air.service';
import { DateValidator } from '../date.validator';
import { LoginVarService } from '../services/login-var.service';
import { OrigDestValidator } from '../orig-dest.validator';

@Component({
  selector: 'app-book-flight',
  templateUrl: './book-flight.component.html',
  styleUrls: ['./book-flight.component.css']
})

export class BookFlightComponent implements OnInit {
  
  selectedDes = "";
  selectedOri = "";
  selectedAir = "";
  selectedTrip = "";
  flightList$: any = [];
  userList$: any = [];
  matchingList: any = [];
  departingFlight: any = [];
  closeDepFlight: any = [];
  returningFlight: any = [];
  closeRetFlight: any = [];
  submitted!: boolean;
  matched!: boolean;
  retDateMatched!: boolean;
  dateDiff: any;


  bookForm = this.fb.group ({
    airLine: ['', Validators.required],
    orig: ['', Validators.required],
    dest: ['', Validators.required],
    trip: ['', Validators.required],
    depDate: ['', Validators.required],
    retDate: [''],
  }, {
      validator: [DateValidator('depDate', 'retDate'), OrigDestValidator('orig','dest')]
    });

  public locations: any = [];
  public airlines: any = [];

  constructor(private fb: FormBuilder, private flight: FlightsService, private locair: OrigDestAirService, private user: UserService, public variable: LoginVarService) { } 


  ngOnInit(): void {
    this.flight.getFlights().subscribe((val) => {
      this.flightList$ = val;
    });
    this.user.getUsers().subscribe((val: any) => {
      this.userList$ = val;
    })

    this.locations = this.locair.getLocations();
    this.airlines = this.locair.getAirLine();    
  }

  onSubmit() {
    const diffDays = (date: any, otherDate: any) => Math.ceil(Math.abs(date - otherDate) / (1000 * 60 * 60 * 24));     

    this.flight.setDepartingFlight(null);
    this.flight.setReturningFlight(null);
    this.submitted = true;
    this.matched = false;
    this.retDateMatched = false;
    this.departingFlight.length = 0;
    this.closeDepFlight.length = 0;
    this.returningFlight.length = 0;
    this.closeRetFlight.length = 0;

    if (this.selectedTrip == 'trip2' && this.bookForm.value.retDate == null) {
      this.matched = false;
      this.retDateMatched = false;
      this.matchingList.length = 0;
    }
    else {
        for (let val of this.flightList$) { 
          this.dateDiff = diffDays(new Date(val.depDate), new Date(this.bookForm.value.depDate));
          if (val.airline == this.bookForm.value.airLine && val.origin == this.bookForm.value.orig && val.destination == this.bookForm.value.dest && val.status == 'Available') {
            if (val.depDate == this.bookForm.value.depDate) {
              this.departingFlight.push(val);
              this.matched = true;
            }                        
            else if (this.dateDiff >= -7 && this.dateDiff <= 7 && this.dateDiff != 0) {
              this.closeDepFlight.push(val);
              this.matched = true;
            }
          }
          
        }      

      if (this.bookForm.value.retDate != null) {
        for (let val of this.flightList$) {
          this.dateDiff = diffDays(new Date(val.depDate), new Date(this.bookForm.value.retDate));
          if (val.airline == this.bookForm.value.airLine && val.origin == this.bookForm.value.dest && val.destination == this.bookForm.value.orig && val.status == 'Available') {
            if (val.depDate == this.bookForm.value.retDate) {              
              this.returningFlight.push(val);
              this.retDateMatched = true;
            }
            else if (this.dateDiff >= -7 && this.dateDiff <= 7 && this.dateDiff != 0) { 
              this.closeRetFlight.push(val);
              this.retDateMatched = true;
            }
          }
          
        }
        if (this.retDateMatched == false) 
          this.matched = false;
      }
    }

    if (this.matched == false && this.retDateMatched == false) {
      this.matched = false;
      this.retDateMatched = false;
      this.departingFlight.length = 0;
      this.returningFlight.length = 0;
    }
    else if (this.matched == false) {
      this.retDateMatched = false;
    }


  }

  onChange() {
    if (this.selectedTrip == 'trip1')
      this.bookForm.controls['retDate'].reset();
  }

  get bf() {
    return this.bookForm.controls;
  }
}
