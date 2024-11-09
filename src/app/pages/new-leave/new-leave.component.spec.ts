import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewLeaveComponent } from './new-leave.component';

describe('NewLeaveComponent', () => {
  let component: NewLeaveComponent;
  let fixture: ComponentFixture<NewLeaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewLeaveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewLeaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
