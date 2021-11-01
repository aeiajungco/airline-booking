import { UserService } from './../services/user.service';
import { AdminService } from './../services/admin.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
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

  form = this.fb.group ({
    $key: [''],
    username: ['', Validators.required],
    password: ['', Validators.required],
  })

  constructor(private fb: FormBuilder, private admins: AdminService, private users: UserService) { }

  ngOnInit(): void {
  }

  setAdmin () {
    this.isAdmin = 1;
    this.isUser = 0;
    console.log("admin")
  }

  setUser () {
    this.isUser = 1;
    this.isAdmin = 0;
    console.log("user")
  }

  login () {
    this.isLoggedIn = 1;
    console.log("Succesfully logged in.")
  }

  onSubmit () {
    console.log(this.isAdmin)
    console.log(this.isUser)
    const login: Login = {
      $key: '',
      username: this.info.username.value,
      password: bcrypt.hashSync(this.info.password.value, 5)
    }
    
    if (this.isUser == 1) {
      this.users.addUser(login);
    }

    else if (this.isAdmin == 1) {
      this.admins.addAdmin(login);
    }
  }

  get info () {
    return this.form.controls;
  }

}
