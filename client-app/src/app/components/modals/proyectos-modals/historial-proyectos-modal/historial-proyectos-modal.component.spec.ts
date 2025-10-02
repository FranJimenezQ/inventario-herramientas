import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialProyectosModalComponent } from './historial-proyectos-modal.component';

describe('HistorialProyectosModalComponent', () => {
  let component: HistorialProyectosModalComponent;
  let fixture: ComponentFixture<HistorialProyectosModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistorialProyectosModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HistorialProyectosModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
