import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroupDirective, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FlightsService } from '../services/flights.service';
import { LoginVarService } from '../services/login-var.service';
import { UserBooking, UserService } from '../services/user.service';

@Component({
  selector: 'app-booking-form',
  templateUrl: './booking-form.component.html',
  styleUrls: ['./booking-form.component.css']
})
export class BookingFormComponent implements OnInit {

  selectedSeat = "";
  selectedUser = "";
  confirmed = false;
  modalRef!: BsModalRef;
  userBookings$: any = [];
  userLoggedIn = "";
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
    this.userLoggedIn = this.variable.getUserName();
  }

  getUsernames() {
    for (let val of this.userBookings$) {         
      this.usernames.push({value: val.username, viewValue: val.username});
    }
  }

  onSubmit() {    
    this.confirmed = true;

    for (let x of this.userBookings$) {
      if (x.username == this.variable.getUserName() || x.username == this.selectedUser) {    
        if (x.bookings.filter((res: string) => res.includes(this.flight.getDepartingFlight() || this.flight.getReturningFlight())).length !== 0) {
          alert("You have already booked this flight.");
          this.confirmed = false;
          this.closeModal();
          break;          
        }
        else {       
          if (this.flight.getDepartingFlight() != null && this.flight.getReturningFlight() != null) {    
            x.bookings.push(this.flight.getDepartingFlight());
            x.bookings.push(this.flight.getReturningFlight());
          }
          else if (this.flight.getReturningFlight() == null) {
            x.bookings.push(this.flight.getDepartingFlight());
          }

          if (this.isAdmin) {
            const bookingInfo: UserBooking = {
              $key: '',
              username: this.bfInfo.user.value,
              firstName: this.bfInfo.fName.value,
              lastName: this.bfInfo.lName.value,
              passNum: this.bfInfo.passNum.value,
              seatClass: this.bfInfo.seatClass.value,
            }
            this.users.addUserBooking(bookingInfo);
          }
          else {
            const bookingInfo: UserBooking = {
              $key: '',
              username: this.userLoggedIn,
              firstName: this.bfInfo.fName.value,
              lastName: this.bfInfo.lName.value,
              passNum: this.bfInfo.passNum.value,
              seatClass: this.bfInfo.seatClass.value,
            }
            this.users.addUserBooking(bookingInfo);
          }    

          this.users.addFlightCode(x.$key, x);
          break;
        }
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
    this.confirmed = false;
    this.modalRef = this.modalService.show(template);
    this.getUsernames();
  }

  closeModal() {
    this.bookingForm.reset();
    this.modalRef?.hide();
 }

  get bfInfo() {
    return this.bookingForm.controls;
  }
}

