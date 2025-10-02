import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccionesEmpleadoModalComponent } from './acciones-empleado-modal.component';

describe('AccionesEmpleadoModalComponent', () => {
  let component: AccionesEmpleadoModalComponent;
  let fixture: ComponentFixture<AccionesEmpleadoModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccionesEmpleadoModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccionesEmpleadoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
