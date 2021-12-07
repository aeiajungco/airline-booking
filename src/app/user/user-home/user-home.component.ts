import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginVarService } from 'src/app/services/login-var.service';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent implements OnInit {
  loggedInUser: any;
  username: any;
  constructor(public varLogin: LoginVarService, public router: Router) { }

  ngOnInit(): void {
    this.loggedInUser = localStorage.getItem('user');
    this.username = localStorage.getItem('username');
    if (this.loggedInUser != 'true') {
      this.router.navigate(['/']);
      localStorage.setItem('user', 'false')
      localStorage.removeItem('username')
    }
  }

}
