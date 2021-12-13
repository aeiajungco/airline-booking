import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';


export interface User {
  $key: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

export interface UserBooking {
  $key: string;
  bookDate: any;
  flightCode: any;
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
    this.userCollection = this.afs.collection<User>('users', ref => ref.orderBy('lastName'));
    this.user$ = this.userCollection.valueChanges();
    
    this.userBookingCollection = this.afs.collection<UserBooking>('userbookings', ref => ref.orderBy('bookDate', 'desc'));
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
  
  removeBooking(bookingID: string) {
    this.userBookingCollection.doc(bookingID).delete();
  }
}

