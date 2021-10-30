import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {FormGroup, Validators, FormBuilder} from '@angular/forms';

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

  @Output() submitted = new EventEmitter<boolean>();
  
  selectedDes = "";
  selectedOri = "";
  selectedAir = "";
  selectedTrip ="";

  bookForm = this.fb.group ({
    airLine: ['', Validators.required],
    orig: ['', Validators.required],
    dest: ['', Validators.required],
    trip: ['', Validators.required],
    depDate: ['', Validators.required],
    retDate: [''],
  });

  constructor(private fb: FormBuilder) { } 

  destinations: Destination [] = [
    {value: 'cdo-0', viewValue: 'Cagayan De Oro'},
    {value: 'cam-1', viewValue: 'Camiguin'},
    {value: 'ceb-2', viewValue: 'Cebu'},
    {value: 'dav-3', viewValue: 'Davao'},
    {value: 'gensan-4', viewValue: 'General Santos'},
    {value: 'kal-5', viewValue: 'Kalibo'},
    {value: 'metman-6', viewValue: 'Metro Manila'},
    {value: 'oza-7', viewValue: 'Ozamiz'},
    {value: 'pagad-8', viewValue: 'Pagadian'},
    {value: 'puerto-9', viewValue: 'Puerto Princesa'},
    {value: 'siar-10', viewValue: 'Siargao'},    
  ];
  
  airlines: Airline [] = [
    {value: 'swift-0', viewValue: 'Air Swift'},
    {value: 'go-1', viewValue: 'Cebgo'},
    {value: 'pacific-2', viewValue: 'Cebu Pacific'},
    {value: 'asia-3', viewValue: 'Philippines AirAsia'},
    {value: 'airlines-4', viewValue: 'Philippine Airlines'},   
    {value: 'jet-5', viewValue: 'SkyJet Airlines Philippines'},
    {value: 'pasada-6', viewValue: 'Sky Pasada'},
  ];

  ngOnInit(): void {
  }

  onSubmit() {
    const flightRec = {
      airLine: this.bf.airLine.value,
      orig: this.bf.orig.value,
      dest: this.bf.dest.value,
      trip: this.bf.trip.value,
      depDate: this.bf.depDate.value,
      retDate: this.bf.retDate.value,
    };

    
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

  get bf() {
    return this.bookForm.controls;
  }
}
