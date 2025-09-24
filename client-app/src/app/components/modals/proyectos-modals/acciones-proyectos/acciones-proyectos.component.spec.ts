import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccionesProyectosComponent } from './acciones-proyectos.component';

describe('AccionesProyectosComponent', () => {
  let component: AccionesProyectosComponent;
  let fixture: ComponentFixture<AccionesProyectosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccionesProyectosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccionesProyectosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
