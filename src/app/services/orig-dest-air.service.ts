import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrigDestAirService {

  constructor() { }

  getLocations() {
    return [
      {value: 'Cagayan De Oro', viewValue: 'Cagayan De Oro'},
      {value: 'Camiguin', viewValue: 'Camiguin'},
      {value: 'Cebu', viewValue: 'Cebu'},
      {value: 'Davao', viewValue: 'Davao'},
      {value: 'General Santos', viewValue: 'General Santos'},
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
      {value: 'Air Swift', viewValue: 'Air Swift'},
      {value: 'Cebgo', viewValue: 'Cebgo'},
      {value: 'Cebu Pacific', viewValue: 'Cebu Pacific'},
      {value: 'Philippines AirAsia', viewValue: 'Philippines AirAsia'},
      {value: 'Philippine Airlines', viewValue: 'Philippine Airlines'},   
      {value: 'SkyJet Airlines Philippines', viewValue: 'SkyJet Airlines Philippines'},
      {value: 'Sky Pasada', viewValue: 'Sky Pasada'},
    ];
  }

  getAirLineFilter() {
    return [
      {value: 'All', viewValue: 'All'},
      {value: 'Air Swift', viewValue: 'Air Swift'},
      {value: 'Cebgo', viewValue: 'Cebgo'},
      {value: 'Cebu Pacific', viewValue: 'Cebu Pacific'},
      {value: 'Philippines AirAsia', viewValue: 'Philippines AirAsia'},
      {value: 'Philippine Airlines', viewValue: 'Philippine Airlines'},   
      {value: 'SkyJet Airlines Philippines', viewValue: 'SkyJet Airlines Philippines'},
      {value: 'Sky Pasada', viewValue: 'Sky Pasada'},
    ];
  }
}
