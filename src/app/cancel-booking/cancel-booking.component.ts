import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-cancel-booking',
  templateUrl: './cancel-booking.component.html',
  styleUrls: ['./cancel-booking.component.css']
})
export class CancelBookingComponent implements OnInit {

  @Input() bookingID: string = '';
  @Input() bookingDate: any;
  @Input() depDate: any;
  dateDiff: any;
  modalRef!: BsModalRef;
  confirmed: boolean = false;

  constructor(private users: UserService, private modalService: BsModalService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
  }
  
  reload() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['./'], { relativeTo: this.route });
  }
  
  onCancel() { 
    const diffDays = (date: any, otherDate: any) => Math.ceil(Math.abs(date - otherDate) / (1000 * 60 * 60 * 24));
    this.dateDiff = diffDays(new Date(this.depDate), new Date(this.bookingDate)); 

    if(this.dateDiff >= 7) {
      this.confirmed == true;
      this.users.removeBooking(this.bookingID);
      this.closeModal();
      this.reload();      
    }
    else {
      this.confirmed = false;
    }
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
    this.confirmed = true;
  }

  closeModal() {
    this.modalRef?.hide();
  }



}
