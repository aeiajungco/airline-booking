import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FlightsService } from '../services/flights.service';
import { LoginVarService } from '../services/login-var.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-booking-form',
  templateUrl: './booking-form.component.html',
  styleUrls: ['./booking-form.component.css']
})
export class BookingFormComponent implements OnInit {

  selectedSeat = "";
  selectedUser = "";
  submitted = false;
  confirmed = false;
  modalRef!: BsModalRef;
  userBookings$: any = [];
  usernames: any = [];
  isAdmin: any;

  bookingForm = this.bForm.group ({
    user: ['',],
    fName: ['', Validators.required],
    lName: ['', Validators.required],
    passNum: ['', Validators.required],
    seatClass: ['', Validators.required],
  });

  constructor(private bForm: FormBuilder, private modalService: BsModalService, private users: UserService, private variable: LoginVarService, private flight: FlightsService ) { }
   
  ngOnInit(): void {
    this.users.getUsers().subscribe((val:any)=> {
      this.userBookings$ = val;
    });

    this.isAdmin = this.variable.getAdmin();
  }

  getUsernames() {
    for (let val of this.userBookings$) {         
      this.usernames.push({value: val.username, viewValue: val.username});
    }
  }

  onSubmit() {    
    this.submitted = true;
    this.confirmed = true;

  
    for (let x of this.userBookings$) {
      console.log(this.variable.getUserName());
      console.log(x.username);
      if (x.username == this.variable.getUserName()) {    
        if (this.flight.getDepartingFlight() != null && this.flight.getReturningFlight() != null) {    
          x.bookings.push(this.flight.getDepartingFlight());
          x.bookings.push(this.flight.getReturningFlight());
        }
        else if (this.flight.getReturningFlight() == null) {
          x.bookings.push(this.flight.getDepartingFlight());
        }
        //this.users.addFlightCode(x.$key, x);
        break;
      }
    }  
  

    this.bookingForm.reset();
    this.bfInfo.fName.setErrors(null);
    this.bfInfo.lName.setErrors(null);
    this.bfInfo.passNum.setErrors(null);
    this.bfInfo.seatClass.setErrors(null);
  }

  openModal(template: TemplateRef<any>) {
    this.usernames.length = 0;
    this.submitted = false;
    this.confirmed = false;
    this.modalRef = this.modalService.show(template);
    this.getUsernames();
  }

  closeModal(template: TemplateRef<any>) {
    this.bookingForm.reset();
    this.modalRef?.hide();
 }

  get bfInfo() {
    return this.bookingForm.controls;
  }
}

