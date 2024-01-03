import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkSupportComponent } from './work-support.component';

describe('WorkSupportComponent', () => {
  let component: WorkSupportComponent;
  let fixture: ComponentFixture<WorkSupportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WorkSupportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WorkSupportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
