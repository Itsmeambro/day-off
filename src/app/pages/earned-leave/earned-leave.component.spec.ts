import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EarnedLeaveComponent } from './earned-leave.component';

describe('EarnedLeaveComponent', () => {
  let component: EarnedLeaveComponent;
  let fixture: ComponentFixture<EarnedLeaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EarnedLeaveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EarnedLeaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
