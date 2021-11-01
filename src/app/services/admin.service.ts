import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

interface Admin {
  $key: string;
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private adminCollection: AngularFirestoreCollection<Admin>;
  admin$!: Observable<Admin[]>;

  constructor(private afs: AngularFirestore) {
    this.adminCollection = this.afs.collection<Admin>('admins');
    this.admin$ = this.adminCollection.valueChanges();
   }

   addAdmin (admin: Admin) {
     const pushkey = this.afs.createId();
     admin.$key = pushkey;
     this.adminCollection.doc(pushkey).set(admin);
   }

   getAdmins () {
     return this.admin$;
   }
}
