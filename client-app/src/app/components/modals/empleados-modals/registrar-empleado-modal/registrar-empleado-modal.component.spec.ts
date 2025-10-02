import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarEmpleadoModalComponent } from './registrar-empleado-modal.component';

describe('RegistrarEmpleadoModalComponent', () => {
  let component: RegistrarEmpleadoModalComponent;
  let fixture: ComponentFixture<RegistrarEmpleadoModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrarEmpleadoModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegistrarEmpleadoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
