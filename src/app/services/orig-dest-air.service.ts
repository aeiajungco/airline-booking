import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrigDestAirService {

  constructor() { }

  getLocations() {
    return [
      {value: 'Cagayan de Oro', viewValue: 'Cagayan de Oro'},
      {value: 'Camiguin', viewValue: 'Camiguin'},
      {value: 'Cebu', viewValue: 'Cebu'},
      {value: 'Davao', viewValue: 'Davao'},
      {value: 'General Santos', viewValue: 'General Santos'},
      {value: 'Iloilo', viewValue: 'Iloilo'},
      {value: 'Kalibo', viewValue: 'Kalibo'},
      {value: 'Metro Manila', viewValue: 'Metro Manila'},
      {value: 'Ozamiz', viewValue: 'Ozamiz'},
      {value: 'Pagadian', viewValue: 'Pagadian'},
      {value: 'Puerto Princesa', viewValue: 'Puerto Princesa'},
      {value: 'Siargao', viewValue: 'Siargao'},    
    ];
  }

  getAirLine() {
    return [
      {value: 'Cebgo', viewValue: 'Cebgo'},
      {value: 'Cebu Pacific', viewValue: 'Cebu Pacific'},
      {value: 'Philippines AirAsia', viewValue: 'Philippines AirAsia'},
      {value: 'Philippine Airlines', viewValue: 'Philippine Airlines'},   
      {value: 'Sunlight Air', viewValue: 'Sunlight Air'},
      {value: 'PAL Express', viewValue: 'PAL Express'},
      {value: 'Pan Pacific Airlines', viewValue: 'Pan Pacific Airlines'},
    ];
  }

  getAirLineFilter() {
    return [
      {value: 'All', viewValue: 'All'},
      {value: 'Cebgo', viewValue: 'Cebgo'},
      {value: 'Cebu Pacific', viewValue: 'Cebu Pacific'},
      {value: 'Philippines AirAsia', viewValue: 'Philippines AirAsia'},
      {value: 'Philippine Airlines', viewValue: 'Philippine Airlines'},   
      {value: 'Sunlight Air', viewValue: 'Sunlight Air'},
      {value: 'PAL Express', viewValue: 'PAL Express'},
      {value: 'Pan Pacific Airlines', viewValue: 'Pan Pacific Airlines'},
    ];
  }

  getStatus () {
    return [
      {value: 'All', viewValue: 'All'},
      {value: 'Available', viewValue: 'Available'},
      {value: 'Cancelled', viewValue: 'Cancelled'},
    ]
  }
}
