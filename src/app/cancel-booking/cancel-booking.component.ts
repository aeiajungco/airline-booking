import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Routes } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-cancel-booking',
  templateUrl: './cancel-booking.component.html',
  styleUrls: ['./cancel-booking.component.css']
})
export class CancelBookingComponent implements OnInit {

  @Input() bookingID: string = '';
  @Input() oneWayFl: any;
  @Input() twoWayFl: any;


  constructor(private users: UserService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
  }
  
  reload() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['./'], { relativeTo: this.route });
  }
  
  onCancel() {    
    this.users.removeBooking(this.bookingID);
    this.reload();
  }



}
