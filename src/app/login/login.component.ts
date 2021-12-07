import { LoginVarService } from './../services/login-var.service';
import { UserService } from './../services/user.service';
import { AdminService } from './../services/admin.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, EventEmitter, Input } from '@angular/core';
import { collection, query, where } from 'firebase/firestore';
import * as bcrypt from 'bcryptjs';

interface Login {
  $key: string;
  username: string;
  password: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loggedIn: any;
  incorrect = 0;
  isUser = 1;
  admins$: any = [];
  users$: any = [];
  role = '';

  form = this.fb.group({
    $key: [''],
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private admins: AdminService,
    private users: UserService,
    public varLogin: LoginVarService
  ) {}

  ngOnInit(): void {
    this.admins.getAdmins().subscribe((val) => {
      this.admins$ = val;
    });
    this.users.getUsers().subscribe((val) => {
      this.users$ = val;
    });
    console.log("login = "+this.varLogin.getLoggedIn());
    localStorage.setItem('user', 'false');
    localStorage.setItem('admin', 'false');
    localStorage.removeItem('username')
  }

  setRole() {
    if (this.role == 'Admin') {
      this.varLogin.setAdmin(1);
      this.varLogin.setUser(0);
      console.log('admin = ' + this.varLogin.getAdmin());
    } else if (this.role == 'User') {
      this.varLogin.setAdmin(0);
      this.varLogin.setUser(1);
      console.log('user = ' + this.varLogin.getUser());
    }
  }

  login() {
    if (this.varLogin.getUser() == 1) {
      this.varLogin.setUserName(this.info.username.value);
      for (let x of this.users$) {
        if (
          x.username != this.info.username.value ||
          !bcrypt.compareSync(this.info.password.value, x.password)
        ) {
          console.log('Incorrect');
          this.incorrect = 1;
        } else if (
          x.username == this.info.username.value &&
          bcrypt.compareSync(this.info.password.value, x.password)
        ) {
          this.varLogin.setLoggedIn(1);
          localStorage.setItem('user', 'true');
          console.log('Succesfully logged in.');
          break;
        }
      }
    } else if (this.varLogin.getAdmin() == 1) {
      this.varLogin.setUserName(this.info.username.value);
      for (let x of this.admins$) {
        if (x.username != this.info.username.value || !bcrypt.compareSync(this.info.password.value, x.password)) {
          console.log('Incorrect');
          this.incorrect = 1;
        } 
        else if (x.username == this.info.username.value && bcrypt.compareSync(this.info.password.value, x.password)) {
          this.varLogin.setLoggedIn(1);
          localStorage.setItem('admin', 'true');
          console.log('Succesfully logged in.');
          break;
        }
      }
    }
    localStorage.setItem('login', this.varLogin.getLoggedIn().toString())
    this.loggedIn = localStorage.getItem('login')
    localStorage.setItem('username', this.varLogin.getUserName())
    console.log("login = "+this.varLogin.getLoggedIn());
  }

  get info() {
    return this.form.controls;
  }
}
