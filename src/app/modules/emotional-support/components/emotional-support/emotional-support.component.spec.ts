import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmotionalSupportComponent } from './emotional-support.component';

describe('EmotionalSupportComponent', () => {
  let component: EmotionalSupportComponent;
  let fixture: ComponentFixture<EmotionalSupportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmotionalSupportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmotionalSupportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
