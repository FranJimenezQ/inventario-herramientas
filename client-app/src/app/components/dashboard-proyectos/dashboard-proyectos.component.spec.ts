import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardProyectosComponent } from './dashboard-proyectos.component';

describe('DashboardProyectosComponent', () => {
  let component: DashboardProyectosComponent;
  let fixture: ComponentFixture<DashboardProyectosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardProyectosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboardProyectosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
