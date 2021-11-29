import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FlightsService } from 'src/app/services/flights.service';
import { LoginVarService } from 'src/app/services/login-var.service';
import { UserService } from 'src/app/services/user.service';

interface AllFlightDetails {
  $key: any;
  bookDate: any;
  flightCode: any;
  origin: string;
  destination: string;
  depDate: Date;
  depTime: any;
  arrTime: any;
  airline: string;  
  username: string;
  firstName: string;
  lastName: string;
  passNum: number;
  seatClass: string;
}


@Component({
  selector: 'app-booking-list',
  templateUrl: './booking-list.component.html',
  styleUrls: ['./booking-list.component.css']
})
export class BookingListComponent implements OnInit {
  userBookings$: any = [];
  flights$: any = [];
  userLoggedIn = '';
  filterChoice = '';
  isBoth!: boolean;
  isOneWay!: boolean;
  isTwoWay!: boolean;
  userFlights: any = [];
  oneWay: any = [];
  twoWayDep: any = [];
  twoWayRet: any = [];

  constructor(private users: UserService, private flights: FlightsService, private variable: LoginVarService, public datepipe: DatePipe) { }

  ngOnInit(): void {
    this.users.getUserBookings().subscribe((val:any)=> {
      this.userBookings$ = val;      
      for (let x of this.userBookings$) {
        if (x.username === this.userLoggedIn) {
          this.userFlights.push(x);
        }
      }    
    });

    this.flights.getFlights().subscribe((val:any)=> {
      this.flights$ = val;      
    });

    this.userLoggedIn = this.variable.getUserName();
    console.log(this.userFlights); 
  }
     
  onChange() {    
    this.oneWay.length = 0;
    this.twoWayDep.length = 0;
    this.twoWayRet.length = 0;
       
    for (let x of this.flights$) {
      for (let y of this.userFlights) { 

        if (x.flightCode == y.flightCode[0] && x.status == 'Available') {
          if (y.flightCode[1] != null) {             
            const depDet: AllFlightDetails = {
              $key: y.$key,
              bookDate: y.bookDate,
              flightCode: x.flightCode,
              origin: x.origin,
              destination: x.destination,
              depDate: x.depDate,
              depTime: x.depTime,
              arrTime: x.arrTime,
              airline: x.airline,                
              username: y.username,
              firstName: y.firstName,
              lastName: y.lastName,
              passNum: y.passNum,
              seatClass: y.seatClass,
            }           
                           
            for (let z of this.flights$) {
              if (z.flightCode == y.flightCode[1] && z.status == 'Available') {
                const retDet: AllFlightDetails = {
                  $key: y.$key,
                  bookDate: y.bookDate,
                  flightCode: z.flightCode,
                  origin: z.origin,
                  destination: z.destination,
                  depDate: z.depDate,
                  depTime: z.depTime,
                  arrTime: z.arrTime,
                  airline: z.airline,                
                  username: y.username,
                  firstName: y.firstName,
                  lastName: y.lastName,
                  passNum: y.passNum,
                  seatClass: y.seatClass,
                }                   
                this.twoWayRet.push(retDet);
                this.twoWayDep.push(depDet);            
              }
            }              
          }
          else {
            const payload: AllFlightDetails = {
              $key: y.$key,
              bookDate: y.bookDate,
              flightCode: x.flightCode,
              origin: x.origin,
              destination: x.destination,
              depDate: x.depDate,
              depTime: x.depTime,
              arrTime: x.arrTime,
              airline: x.airline,                
              username: y.username,
              firstName: y.firstName,
              lastName: y.lastName,
              passNum: y.passNum,
              seatClass: y.seatClass,
            }   
              this.oneWay.push(payload);
          }         
          break;     
        }     
      }
    }
    
    switch(this.filterChoice) {
      case 'Both':
        if (this.oneWay.length != 0 && this.twoWayDep != 0 && this.twoWayRet != 0)
          this.isBoth = true;     
        else if (this.oneWay.length != 0)
          this.isOneWay = true;
        else if (this.twoWayDep.length != 0 && this.twoWayRet.length != 0)
          this.isTwoWay = true;
        else 
          this.isBoth = false;   

        break;
      case 'One-Way':
        if (this.oneWay.length != 0) {
          this.isBoth = false;
          this.isOneWay = true;
          this.isTwoWay = false;
        }
        else 
          this.isOneWay = false;
          this.isTwoWay = false;
          this.isBoth = false;
        
        break;
      case 'Two-Way':
        if (this.twoWayDep.length != 0 && this.twoWayRet.length != 0) {
          this.isBoth = false;
          this.isOneWay = false;
          this.isTwoWay = true;
        }
        else 
          this.isTwoWay = false;
          this.isOneWay = false;
          this.isBoth = false;

        break;
    }

    console.log(this.oneWay);
    console.log(this.twoWayDep);
    console.log(this.twoWayRet);  
  }    

}
