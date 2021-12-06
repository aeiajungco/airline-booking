import { LoginVarService } from './../../services/login-var.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css'],
})
export class AdminHomeComponent implements OnInit {
  username: any;
  loggedInAdmin: any;

  constructor(public varLogin: LoginVarService, public router: Router) {
  }

  ngOnInit() {
    this.loggedInAdmin = localStorage.getItem('admin');
    this.username = localStorage.getItem('username');
    console.log(this.username);
    if (this.loggedInAdmin != 'true') 
      this.router.navigate(['/error']);
    console.log("login = "+this.loggedInAdmin)
  }
}
