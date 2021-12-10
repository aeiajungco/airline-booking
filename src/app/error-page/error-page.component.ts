import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.css']
})
export class ErrorPageComponent implements OnInit {
  admin: any;
  user: any;
  login: any;
  constructor() { }

  ngOnInit(): void {
    this.admin = localStorage.getItem('admin')
    this.user = localStorage.getItem('user')
    this.login = localStorage.getItem('login')
  }

}
