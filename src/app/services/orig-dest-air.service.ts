import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrigDestAirService {

  constructor() { }

  getLocations() {
    return [
      {value: 'CGY', viewValue: 'Cagayan de Oro'},
      {value: 'CGM', viewValue: 'Camiguin'},
      {value: 'CEB', viewValue: 'Cebu'},
      {value: 'DVO', viewValue: 'Davao'},
      {value: 'GES', viewValue: 'General Santos'},
      {value: 'ILO', viewValue: 'Iloilo'},
      {value: 'KLO', viewValue: 'Kalibo'},
      {value: 'MNL', viewValue: 'Metro Manila'},
      {value: 'OZC', viewValue: 'Ozamiz'},
      {value: 'PAG', viewValue: 'Pagadian'},
      {value: 'PPS', viewValue: 'Puerto Princesa'},
      {value: 'IAO', viewValue: 'Siargao'},    
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
