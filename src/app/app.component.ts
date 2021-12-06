import { LoginVarService } from './services/login-var.service';
import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { variable } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'airline-booking';
  loggedIn: any;
  constructor (public varLogin: LoginVarService) {}

  ngOnInit () {
    if (localStorage.getItem('admin') == 'false' && localStorage.getItem('user') == 'false') 
      this.loggedIn = false;
  }

  ngOnChange () {
    
  }
}
