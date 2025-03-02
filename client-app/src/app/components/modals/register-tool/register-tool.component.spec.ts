import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterToolComponent } from './register-tool.component';

describe('RegisterToolComponent', () => {
  let component: RegisterToolComponent;
  let fixture: ComponentFixture<RegisterToolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterToolComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegisterToolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
