import { FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-flight',
  templateUrl: './create-flight.component.html',
  styleUrls: ['./create-flight.component.css']
})
export class CreateFlightComponent implements OnInit {

  form = this.fb.group ({
    
  }
  )

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

}
