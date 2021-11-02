import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-booking-form',
  templateUrl: './booking-form.component.html',
  styleUrls: ['./booking-form.component.css']
})
export class BookingFormComponent implements OnInit {

  selectedSeat = "";
  submitted = false;


  bookingForm = this.bForm.group ({
    fName: ['', Validators.required],
    lName: ['', Validators.required],
    passNum: ['', Validators.required],
    seatClass: ['', Validators.required],
  });

  constructor(private bForm: FormBuilder) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.submitted = true;
  }


  get bfInfo() {
    return this.bookingForm.controls;
  }
}
