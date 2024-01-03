import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VirtualCoffeeBreakComponent } from './virtual-coffee-break.component';

describe('VirtualCoffeeBreakComponent', () => {
  let component: VirtualCoffeeBreakComponent;
  let fixture: ComponentFixture<VirtualCoffeeBreakComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VirtualCoffeeBreakComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VirtualCoffeeBreakComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
