import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignToolComponent } from './assign-tool.component';

describe('AssignToolComponent', () => {
  let component: AssignToolComponent;
  let fixture: ComponentFixture<AssignToolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssignToolComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AssignToolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
