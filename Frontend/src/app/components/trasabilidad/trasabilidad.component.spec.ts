import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrasabilidadComponent } from './trasabilidad.component';

describe('TrasabilidadComponent', () => {
  let component: TrasabilidadComponent;
  let fixture: ComponentFixture<TrasabilidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrasabilidadComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TrasabilidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
