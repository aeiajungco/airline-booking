export interface Flight {
  $key: string;
  destination: string;
  origin: string;
  depDate: Date;
  depTime: any;
  arrTime: any;
  flightCode: string;
  flightPrice: number;
  airline: string;
  status: string;
}