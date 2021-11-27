import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnewayBookingListComponent } from './oneway-booking-list.component';

describe('OnewayBookingListComponent', () => {
  let component: OnewayBookingListComponent;
  let fixture: ComponentFixture<OnewayBookingListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnewayBookingListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OnewayBookingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
