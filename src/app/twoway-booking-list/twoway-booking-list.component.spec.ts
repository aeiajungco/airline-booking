import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TwowayBookingListComponent } from './twoway-booking-list.component';

describe('TwowayBookingListComponent', () => {
  let component: TwowayBookingListComponent;
  let fixture: ComponentFixture<TwowayBookingListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TwowayBookingListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TwowayBookingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
