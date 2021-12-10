import { orderBy } from 'firebase/firestore';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Flight } from 'src/app/services/flight';

@Injectable({
  providedIn: 'root'
})

export class FlightsService {
  private flightsCollection: AngularFirestoreCollection<Flight>;
  flight$!: Observable<Flight[]>;
  depFlight: any;
  retFlight: any;

  constructor(private afs: AngularFirestore) {
    this.flightsCollection = this.afs.collection<Flight>('flights', ref => ref.orderBy('depDate'))
    this.flight$ = this.flightsCollection.valueChanges();
  }

  addFlight (flight: Flight) {
    const pushkey = this.afs.createId();
    flight.$key = pushkey;
    this.flightsCollection.doc(pushkey).set(flight);
  }

  getFlights () {
    return this.flight$;
  }

  setDepartingFlight(flightcode: any) {
    this.depFlight = flightcode;
  }

  setReturningFlight(flightcode: any) {
    this.retFlight = flightcode;
  }

  removeDepFlight() {
    this.depFlight = null;
  }

  removeRetFlight() {
    this.retFlight = null
  }

  getDepartingFlight() {
    return this.depFlight;
  }

  getReturningFlight() {
    return this.retFlight;
  }

  cancelFLight(flight: any, cancel: any) {
    this.flightsCollection.doc(flight).update({status: cancel});
  }
}
   