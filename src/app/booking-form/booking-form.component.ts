import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { LoginVarService } from '../services/login-var.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-booking-form',
  templateUrl: './booking-form.component.html',
  styleUrls: ['./booking-form.component.css']
})
export class BookingFormComponent implements OnInit {

  selectedSeat = "";
  submitted = false;
  confirmed = false;
  modalRef!: BsModalRef;
  userBookings$: any = [];

  bookingForm = this.bForm.group ({
    fName: ['', Validators.required],
    lName: ['', Validators.required],
    passNum: ['', Validators.required],
    seatClass: ['', Validators.required],
  });

  constructor(private bForm: FormBuilder, private modalService: BsModalService, private users: UserService, private userName: LoginVarService) { }
  
  @Input() flightCode: any; 
  
  ngOnInit(): void {
    this.users.getUsers().subscribe((val:any)=> {
      this.userBookings$ = val;
    });
  }

  onSubmit() {    
    this.submitted = true;
    this.confirmed = true;

    for (let x of this.userBookings$) {
      console.log(this.userName.getUserName());
      console.log(x.username);
      if (x.username == this.userName.getUserName()) {       
        if (x.bookings.filter((res: string) => res.includes(this.flightCode)).length !== 0) {
          alert("You have already booked this flight.");
          this.confirmed = false;
          break;          
        }
        else {                
        x.bookings.push(this.flightCode);
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
    this.modalRef = this.modalService.show(template);
    console.log(this.flightCode);
 }

 closeModal(template: TemplateRef<any>) {
   this.submitted = false;
   this.confirmed = false;
   this.bookingForm.reset();
   this.modalRef.hide();
 }

  get bfInfo() {
    return this.bookingForm.controls;
  }
}
