import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import * as firebase from 'firebase/compat';
import { user } from 'rxfire/auth';
import { Observable } from 'rxjs';
import { AdminHomeComponent } from '../admin/admin-home/admin-home.component';

export interface User {
  $key: string;
  username: string;
  email: string;
  password: string;
  bookings: any;
}

export interface UserBooking {
  $key: string;
  username: string;
  firstName: string;
  lastName: string;
  passNum: number;
  seatClass: string;
}

@Injectable({
  providedIn: 'root'
})

export class UserService {
  private userCollection: AngularFirestoreCollection<User>;
  private userBookingCollection: AngularFirestoreCollection<UserBooking>;
  user$!: Observable<User[]>;  
  userBooking$!: Observable<UserBooking[]>;

  constructor(private afs: AngularFirestore) {
    this.userCollection = this.afs.collection<User>('users');
    this.user$ = this.userCollection.valueChanges();
    
    this.userBookingCollection = this.afs.collection<UserBooking>('userbookings');
    this.userBooking$ = this.userBookingCollection.valueChanges();
  }

  addUser (user: User) {
    const pushkey = this.afs.createId();
    user.$key = pushkey;
    this.userCollection.doc(pushkey).set(user);
  }
  
  addUserBooking (userBooking: UserBooking) {
    const pushkey = this.afs.createId();
    userBooking.$key = pushkey;
    this.userBookingCollection.doc(pushkey).set(userBooking);
  }

  addFlightCode (userID:string, userBookings: User) {
    this.userCollection.doc(userID).update(userBookings);
  }

  getUsers () {
    return this.user$;
  }

  getUserBookings () {
    return this.userBooking$;
  }
  
}

