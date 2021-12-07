import { Component, OnInit } from '@angular/core';
import { LoginVarService } from '../services/login-var.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  loggedIn: any;
  constructor (public varLogin: LoginVarService) {}

  ngOnInit () {
    if (localStorage.getItem('admin') == 'false' && localStorage.getItem('user') == 'false') 
      this.loggedIn = false;
  }

}
