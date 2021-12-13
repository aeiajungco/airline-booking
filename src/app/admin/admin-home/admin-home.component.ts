import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({  
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css'],
})
export class AdminHomeComponent implements OnInit {
  name: any;

  loggedInAdmin: any;

  constructor(public router: Router) {
  }

  ngOnInit() {
    this.name = localStorage.getItem('firstName');
    if (localStorage.getItem('admin') != 'true') {
      this.router.navigate(['/error'])
    }
  }
}
