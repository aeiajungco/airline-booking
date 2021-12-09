import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginVarService {
  isAdmin = 0;
  isUser = 0;
  isLoggedIn = 0;
  userName: string = '';

  constructor () { }

  setAdmin (n: number) {
    this.isAdmin = n;
  }

  setUser (n: number) {
    this.isUser = n;
  }
  
  setLoggedIn (n: number) {
    this.isLoggedIn = n;
  }

  getAdmin () {
    return this.isAdmin;
  }

  getUser () {
    return this.isUser;
  }

  getLoggedIn () {
    return this.isLoggedIn;
  }

  setUserName (username: string) {
    this.userName = username;
  }

  getUserName () {
    return this.userName;
  }
}
