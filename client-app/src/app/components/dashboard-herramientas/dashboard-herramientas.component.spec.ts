import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardHerramientasComponent } from './dashboard-herramientas.component';

describe('DashboardHerramientasComponent', () => {
  let component: DashboardHerramientasComponent;
  let fixture: ComponentFixture<DashboardHerramientasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardHerramientasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboardHerramientasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
