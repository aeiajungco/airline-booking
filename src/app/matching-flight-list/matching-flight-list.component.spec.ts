import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchingFlightListComponent } from './matching-flight-list.component';

describe('MatchingFlightListComponent', () => {
  let component: MatchingFlightListComponent;
  let fixture: ComponentFixture<MatchingFlightListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatchingFlightListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchingFlightListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
