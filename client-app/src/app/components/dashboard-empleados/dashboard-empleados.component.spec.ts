import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardEmpleadosComponent } from './dashboard-empleados.component';

describe('DashboardEmpleadosComponent', () => {
  let component: DashboardEmpleadosComponent;
  let fixture: ComponentFixture<DashboardEmpleadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardEmpleadosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboardEmpleadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
