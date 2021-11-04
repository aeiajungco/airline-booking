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
  $users: any = [];

  ngOnInit(): void {
  }

  regForm= this.fb.group ({
    $key: [''],
    username: ['', { validators: [Validators.required, Validators.minLength(5)]}],
    email: ['', { validators: [Validators.required, Validators.email]}],
    password: ['', { validators: [Validators.required, Validators.minLength(8)]}],
    verifpass: ['', Validators.required],
  }, {
      validator: ConfirmedValidator('password', 'verifpass')
    });

  onSubmit() {
    const payload: User = {
      $key: '',
      username: this.rf.username.value,
      email: this.rf.email.value,
      password: this.hashAndSalt(this.rf.password.value),
    };

    this.user.addUser(payload);  
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
