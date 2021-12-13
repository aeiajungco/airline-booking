import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'airline-booking';
  loggedIn: any;
  constructor () {}

  ngOnInit () {
    if (localStorage.getItem('login') == '0') 
      this.loggedIn = false;
  }
}
