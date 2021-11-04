import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';

export interface User {
  $key: string;
  username: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})

export class UserService {
  private userCollection: AngularFirestoreCollection<User>;
  user$!: Observable<User[]>;

  constructor(private afs: AngularFirestore) {
    this.userCollection = this.afs.collection<User>('users');
    this.user$ = this.userCollection.valueChanges();
   }

   addUser (user: User) {
     const pushkey = this.afs.createId();
     user.$key = pushkey;
     this.userCollection.doc(pushkey).set(user);
   }

   getUsers () {
     return this.user$;
   }
}
