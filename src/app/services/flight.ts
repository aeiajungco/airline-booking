export interface Flight {
    $key: string;
    destination: string;
    origin: string;
    depTime: any;
    arrTime: any;
    type: string;
    flightCode: string;
    flightPrice: number;
    airline: string;
    status: string;
  }