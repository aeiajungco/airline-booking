import { Component, OnInit, TemplateRef, ViewEncapsulation } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService, User } from 'src/app/services/user.service';
import { ConfirmedValidator } from 'src/app/confirmed.validator';
import * as bcrypt from 'bcryptjs';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class RegisterComponent implements OnInit {

  constructor(private fb: FormBuilder, private user: UserService, private modalService: BsModalService) { }
  users$: any = [];
  usernameExists!: boolean;
  emailaddExists!: boolean;
  registered!: boolean;
  modalRef!: BsModalRef;

  ngOnInit(): void {
    this.user.getUsers().subscribe((val) => {
      this.users$ = val;
    });
  }

  regForm = this.fb.group ({
    $key: [''],
    firstName: ['', { validators: [Validators.required]}],
    lastName: ['', { validators: [Validators.required]}], 
    username: ['', { validators: [Validators.required, Validators.minLength(5)]}],      
    email: ['', { validators: [Validators.required, Validators.email]}],
    password: ['', { validators: [Validators.required, Validators.minLength(8)]}],
    verifpass: ['', Validators.required],
  }, {
      validators: ConfirmedValidator('password', 'verifpass'),
    },
  );
 
  onSubmit() {
    const payload: User = {
      $key: '',
      firstName: this.rf.firstName.value,
      lastName: this.rf.lastName.value,
      username: this.rf.username.value,
      email: this.rf.email.value,
      password: this.hashAndSalt(this.rf.password.value),
    };

    // this.user.addUser(payload);  
    this.registered = true;
    this.regForm.reset();
    this.rf['firstName'].setErrors(null);
    this.rf['lastName'].setErrors(null);
    this.rf['username'].setErrors(null);
    this.rf['email'].setErrors(null);
    this.rf['password'].setErrors(null);
    this.rf['verifpass'].setErrors(null);
  }
  
  checkUsername() {
    this.usernameExists = false;
    for (let val of this.users$) {
      if (val.username === this.regForm.value.username) {
        this.usernameExists = true;
        break;
      }
    }  
  }

  checkEmail() {
    this.emailaddExists = false;
    for (let val of this.users$) {
      if (val.email === this.regForm.value.email) {
        this.emailaddExists = true;
        break;
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
  
  register (template: TemplateRef<any>) {
    this.registered = false;
    this.modalRef = this.modalService.show(template);
  }

}
