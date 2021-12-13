import { UserService } from './../services/user.service';
import { AdminService } from './../services/admin.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import * as bcrypt from 'bcryptjs';

// interface Admin {
//   $key: string;
//   username: string;
//   password: string;
//   fName: string;
//   lName: string;
// }

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loggedIn: any;
  admin: any;
  user: any;
  incorrect = false;
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
  ) {}

  ngOnInit(): void {
    this.admins.getAdmins().subscribe((val) => {
      this.admins$ = val;
    });
    this.users.getUsers().subscribe((val) => {
      this.users$ = val;
    });
    localStorage.setItem('login', '0');
    localStorage.setItem('user', 'false');
    localStorage.setItem('admin', 'false');
    localStorage.removeItem('username');
    localStorage.removeItem('firstName');
  }

  setRole() {
    if (this.role == 'Admin') {
      localStorage.setItem('admin', 'true');
      localStorage.setItem('user', 'false');
    } else if (this.role == 'User') {
      localStorage.setItem('user', 'true');
      localStorage.setItem('admin', 'false');
    }
    this.admin = localStorage.getItem('admin');
    this.user = localStorage.getItem('user');
  }

  login() {
    if (
      this.info.username.errors?.required == true ||
      this.info.password.errors?.required == true
    )
      this.incorrect = false;
    else {
      if (this.user == 'true') {
        localStorage.setItem('username', this.info.username.value);
        for (let x of this.users$) {
          if (
            x.username != this.info.username.value ||
            !bcrypt.compareSync(this.info.password.value, x.password)
          ) {
            this.incorrect = true;
          } else if (
            x.username == this.info.username.value &&
            bcrypt.compareSync(this.info.password.value, x.password)
          ) {
            localStorage.setItem('login', '1');
            localStorage.setItem('user', 'true');
            localStorage.setItem('firstName', x.firstName);
            break;
          }
        }
      }
      else if (this.admin == 'true') {
        localStorage.setItem('username', this.info.username.value);
        for (let x of this.admins$) {
          if (
            x.username != this.info.username.value ||
            !bcrypt.compareSync(this.info.password.value, x.password)
          ) {
            console.log('Incorrect');
            this.incorrect = true;
          } else if (
            x.username == this.info.username.value &&
            bcrypt.compareSync(this.info.password.value, x.password)
          ) {
            localStorage.setItem('login', '1');
            localStorage.setItem('admin', 'true');
            localStorage.setItem('firstName', x.firstName);
            break;
          }
        }
      }

      /*TO CREATE AN ADMIN ACCOUT
      const payload: Admin = {
        $key: '',
        fName: 'Juan',
        lName: 'Dela Cruz',
        username: this.info.username.value,
        
        const salt = bcrypt.genSaltSync(10);
        password: this.bcrypt(this.info.password.value, salt),
      };
      this.admins.addAdmin(payload)*/
      this.loggedIn = localStorage.getItem('login');
    }
  }

  get info() {
    return this.form.controls;
  }
}
