import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { OrigDestAirService } from './../../services/orig-dest-air.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { FlightsService } from 'src/app/services/flights.service';
import { Flight } from 'src/app/services/flight';

@Component({
  selector: 'app-create-flight',
  templateUrl: './create-flight.component.html',
  styleUrls: ['./create-flight.component.css'],
})
export class CreateFlightComponent implements OnInit {
  form = this.fb.group({
    $key: [''],
    destination: ['', Validators.required],
    origin: ['', Validators.required],
    depDate: ['', Validators.required],
    depTime: ['', Validators.required],
    arrTime: ['', Validators.required],
    type: ['', Validators.required],
    flightCode: ['', Validators.required],
    flightPrice: ['', Validators.required],
    airline: ['', Validators.required],
  });

  public locations: any = [];
  public airlines: any = [];
  modalRef!: BsModalRef;
  invalid = 0;

  constructor(
    private fb: FormBuilder,
    private flights: FlightsService,
    private option: OrigDestAirService,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {
    this.locations = this.option.getLocations();
    this.airlines = this.option.getAirLine();
  }

  onSubmit(template: TemplateRef<any>) {
    const flightInfo: Flight = {
      $key: '',
      destination: this.info.destination.value,
      origin: this.info.origin.value,
      depDate: this.info.depDate.value,
      depTime: this.info.depTime.value,
      arrTime: this.info.arrTime.value,
      type: this.info.type.value,
      flightCode: this.info.flightCode.value,
      flightPrice: this.info.flightPrice.value,
      airline: this.info.airline.value,
      status: 'Available',
    };

    this.flights.addFlight(flightInfo);
    this.showConfirm(template);
  }

  validateTime() {
    if (
      this.info.depTime.value >= this.info.arrTime.value &&
      this.info.arrTime.value
    ) {
      this.invalid = 1;
      console.log(this.info.depTime.value - this.info.arrTime.value);
    } else this.invalid = 0;
  }

  showConfirm(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
    setTimeout(() => {
      this.close();
    }, 1500);
  }

  close() {
    this.form.reset();
    this.modalRef?.hide();
  }

  get info() {
    return this.form.controls;
  }
}
