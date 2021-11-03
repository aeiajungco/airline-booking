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

  constructor(private afs: AngularFirestore) {
    this.flightsCollection = this.afs.collection<Flight>('flights')
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
}
   