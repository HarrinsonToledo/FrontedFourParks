import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisteredParkingComponent } from './registered-parking.component';

describe('RegisteredParkingComponent', () => {
  let component: RegisteredParkingComponent;
  let fixture: ComponentFixture<RegisteredParkingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisteredParkingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegisteredParkingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
