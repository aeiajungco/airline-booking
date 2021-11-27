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
  constructor (public login: LoginVarService) {}

  ngOnInit () {
    localStorage.setItem('val', this.login.getLoggedIn().toString())
    this.loggedIn = localStorage.getItem('val');
  }

  ngOnChange () {
  }
}
