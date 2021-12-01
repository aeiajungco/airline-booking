import { FormBuilder, Validators } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';



@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {

  @Input() username = '';
 
  constructor() { }

  ngOnInit(): void {
    
  }
  
}
