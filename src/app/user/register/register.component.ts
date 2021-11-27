import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService, User } from 'src/app/services/user.service';
import { ConfirmedValidator } from 'src/app/confirmed.validator';
import * as bcrypt from 'bcryptjs';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private fb: FormBuilder, private user: UserService) { }
  users$: any = [];
  usernameExists!: boolean;
  emailaddExists!: boolean;
  registered!: boolean;

  ngOnInit(): void {
    this.user.getUsers().subscribe((val) => {
      this.users$ = val;
    });

  }

  regForm= this.fb.group ({
    $key: [''],
    username: ['', { validators: [Validators.required, Validators.minLength(5)]}],        
    email: ['', { validators: [Validators.required, Validators.email]}],
    password: ['', { validators: [Validators.required, Validators.minLength(8)]}],
    verifpass: ['', Validators.required],
  }, {
      validators: ConfirmedValidator('password', 'verifpass'),
    });

  onSubmit() {
    const payload: User = {
      $key: '',
      username: this.rf.username.value,
      email: this.rf.email.value,
      password: this.hashAndSalt(this.rf.password.value),
    };

    this.user.addUser(payload);  
    this.regForm.reset();
    this.rf['username'].setErrors(null);
    this.rf['email'].setErrors(null);
    this.rf['password'].setErrors(null);
    this.rf['verifpass'].setErrors(null);
  }

  onRegister() {
    this.registered = true;
  }

  checkUsername() {
    this.usernameExists = false;
    for (let val of this.users$) {
      if (val.username === this.regForm.value.username) {
        this.usernameExists = true;
      }
    }
  }

  checkEmail() {
    this.emailaddExists = false;
    for (let val of this.users$) {
      if (val.email === this.regForm.value.email) {
        this.emailaddExists = true;
      }
    }
  }

  hashAndSalt(pass: any) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(pass, salt);
    return hash;
  }

  get rf() {
    return this.regForm.controls;
  }
}
