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
  @Input() status: string = '';
  @Input() bookingDate: any;
  @Input() depDate: any;
  dateDiff: any;
  modalRef!: BsModalRef;
  isAdmin: any;
  confirmed: boolean = false;
  successful: boolean = false;

  constructor(private users: UserService, private modalService: BsModalService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.isAdmin = localStorage.getItem('admin')
  }
  
  reload() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['./'], { relativeTo: this.route });
  }
  
  onCancel() { 
    const diffDays = (date: any, otherDate: any) => Math.ceil(Math.abs(date - otherDate) / (1000 * 60 * 60 * 24));
    this.dateDiff = diffDays(new Date(this.depDate), new Date(this.bookingDate)); 

    if(this.isAdmin == 'true') {
      this.users.removeBooking(this.bookingID);
      setTimeout(()=> {
        this.closeModal(),
        this.reload();  
      }, 1200);  
    }
    else {
      if(this.dateDiff >= 7) {
        this.successful = true;
        this.users.removeBooking(this.bookingID);
        setTimeout(()=> {
          this.closeModal(),
          this.reload();  
        }, 1200);          
      }
      else {
        this.confirmed = false;
        setTimeout(()=> {
          this.closeModal();
        }, 1200);
      }
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
