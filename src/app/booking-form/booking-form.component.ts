import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-booking-form',
  templateUrl: './booking-form.component.html',
  styleUrls: ['./booking-form.component.css']
})
export class BookingFormComponent implements OnInit {

  selectedSeat = "";
  submitted = false;
  modalRef!: BsModalRef;

  bookingForm = this.bForm.group ({
    fName: ['', Validators.required],
    lName: ['', Validators.required],
    passNum: ['', Validators.required],
    seatClass: ['', Validators.required],
  });

  constructor(private bForm: FormBuilder, private modalService: BsModalService) { }
  
  @Input() flightCode: any; 
  
  ngOnInit(): void {
  }

  onSubmit() {
    this.submitted = true;
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
 }

 closeModal(template: TemplateRef<any>) {
   this.submitted = false;
   this.bookingForm.reset();
   this.modalRef.hide();
 }

  get bfInfo() {
    return this.bookingForm.controls;
  }
}
