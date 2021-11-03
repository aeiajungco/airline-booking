import { UserService } from './../services/user.service';
import { AdminService } from './../services/admin.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
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
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  isAdmin = 0;
  isUser = 0;
  isLoggedIn = 0;
  incorrect = 0;
  admins$: any = [];
  users$: any = [];

  form = this.fb.group ({
    $key: [''],
    username: ['', Validators.required],
    password: ['', Validators.required],
  })

  constructor(private fb: FormBuilder, private admins: AdminService, private users: UserService) { }

  ngOnInit(): void {
    this.admins.getAdmins().subscribe((val) => {
      this.admins$ = val;
    });
    this.users.getUsers().subscribe((val) => {
      this.users$ = val;
    });
  }

  loginAdmin () {
    this.isLoggedIn = 0;
    this.isAdmin = 1;
    this.isUser = 0;
    console.log("admin")
  }

  loginUser () {
    this.isLoggedIn = 0;
    this.isUser = 1;
    this.isAdmin = 0;
    console.log("user")
  }

  login () {
    if (this.isUser == 1) {
      for (let x of this.users$) {
        if (x.username != this.info.username.value || !bcrypt.compareSync(this.info.password.value, x.password)) {
          console.log("Incorrect");
          this.isLoggedIn = 0;
          this.incorrect = 1;
        }
        else {
        this.isLoggedIn = 1;
        console.log("Succesfully logged in.")
        }
      }
    }

    else if (this.isAdmin == 1) {
      for (let x of this.admins$) {
        if (x.username != this.info.username.value || !bcrypt.compareSync(this.info.password.value, x.password)) {
          console.log("Incorrect");
          this.isLoggedIn = 0;
          this.incorrect = 1;
        }
        else {
        this.isLoggedIn = 1;
        console.log("Succesfully logged in.")
        }
      }
      
    }
    console.log(this.isLoggedIn)
  }

  get info () {
    return this.form.controls;
  }

}
