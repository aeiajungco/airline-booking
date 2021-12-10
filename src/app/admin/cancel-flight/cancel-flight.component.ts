import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { FlightsService } from 'src/app/services/flights.service';

@Component({
  selector: 'app-cancel-flight',
  templateUrl: './cancel-flight.component.html',
  styleUrls: ['./cancel-flight.component.css']
})
export class CancelFlightComponent implements OnInit {

  @Input() flightCode: any; 
  @Input() status: any;

  flights$: any = [];
  modalRef!: BsModalRef;
    

  constructor(private flight: FlightsService, private modalService: BsModalService) { }

  ngOnInit(): void {
    this.flight.getFlights().subscribe((val) => {
      this.flights$ = val;
    });

  }

  cancelFlight() {
    for (let x of this.flights$) {
      if (x.flightCode == this.flightCode) {
        this.flight.cancelFLight(x.$key, 'Cancelled');
        setTimeout(()=> {
          this.closeModal();
        }, 500);
      }
    }
  }
  
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  closeModal() {
    this.modalRef?.hide();
  }
}
