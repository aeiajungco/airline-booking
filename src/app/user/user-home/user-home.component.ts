import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent implements OnInit {
  loggedInUser: any;
  name: any;
  constructor(public router: Router) { }

  ngOnInit(): void {
    this.name = localStorage.getItem('firstName');
    if (localStorage.getItem('user') != 'true' ) {
      this.router.navigate(['/error'])
    }
  }

}
