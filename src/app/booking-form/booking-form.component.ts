import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FlightsService } from '../services/flights.service';
import { LoginVarService } from '../services/login-var.service';
import { UserBooking, UserService } from '../services/user.service';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

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
  userLoggedIn: any;
  usernames: any = [];
  isAdmin: any;
  currentDate: any;

  bookingForm = this.bForm.group ({
    user: ['',],
    fName: ['', Validators.required],
    lName: ['', Validators.required],
    passNum: ['', Validators.required],
    seatClass: ['', Validators.required],
  });

  constructor(private bForm: FormBuilder, private modalService: BsModalService, private users: UserService, private variable: LoginVarService, private flight: FlightsService, public datepipe: DatePipe, private router: Router, private route: ActivatedRoute ) { }
   
  ngOnInit(): void {
    this.users.getUsers().subscribe((val:any)=> {
      this.userBookings$ = val;
    });

    this.isAdmin = this.variable.getAdmin();
    this.userLoggedIn = localStorage.getItem('username');
  }

  getUsernames() {
    for (let val of this.userBookings$) {         
      this.usernames.push({value: val.username, viewValue: val.username});
    }
  }

  getCurrentDate() {
    this.currentDate = new Date();
    let bookDate = this.datepipe.transform(this.currentDate, 'yyyy-MM-dd');
    return bookDate;
  }

  onSubmit() {    
    this.confirmed = true;

      if (this.isAdmin) {
        const bookingInfo: UserBooking = {
          $key: '',
          bookDate: this.getCurrentDate(),
          flightCode: [this.flight.getDepartingFlight(), this.flight.getReturningFlight()],
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
            bookDate: this.getCurrentDate(),
            flightCode: [this.flight.getDepartingFlight(), this.flight.getReturningFlight()],
            username: this.userLoggedIn,
            firstName: this.bfInfo.fName.value,
            lastName: this.bfInfo.lName.value,
            passNum: this.bfInfo.passNum.value,
            seatClass: this.bfInfo.seatClass.value,
          }
            console.log(this.getCurrentDate());
            this.users.addUserBooking(bookingInfo);
        }    
    
    this.bookingForm.reset();
    this.bfInfo.fName.setErrors(null);
    this.bfInfo.lName.setErrors(null);
    this.bfInfo.passNum.setErrors(null);
    this.bfInfo.seatClass.setErrors(null);
    setTimeout(()=> {
      this.modalRef?.hide(),
      this.reload();
    },600);  
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

 reload() {
  this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  this.router.onSameUrlNavigation = 'reload';
  this.router.navigate(['./'], { relativeTo: this.route });
}

  get bfInfo() {
    return this.bookingForm.controls;
  }
}

