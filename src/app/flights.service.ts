import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

class FlightInfo {
  destination!: string;
  origin!: string;
  depTime: any;
  arrTime: any;
  type!: string;
  flightCode!: string;
  flightPrice!: number;
  airline!: string;
}

export class FlightsService {

  flightList: FlightInfo [] = [
    {
      destination: 'Ozamiz',
      origin: 'Cebu',
      depTime: '9:00 AM',
      arrTime: '10:15 AM',
      type: 'Economy',
      flightCode: 'OZC',
      flightPrice: 1987,
      airline: 'Cebu Pacific',
    }
  ]

  constructor() { }
}
