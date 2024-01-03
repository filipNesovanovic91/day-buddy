import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SportActivityOrganizerComponent } from './sport-activity-organizer.component';

describe('SportActivityOrganizerComponent', () => {
  let component: SportActivityOrganizerComponent;
  let fixture: ComponentFixture<SportActivityOrganizerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SportActivityOrganizerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SportActivityOrganizerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
