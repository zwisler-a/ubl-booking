import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ConfirmCancelationComponent } from './confirm-cancelation.component';

describe('ConfirmCancelationComponent', () => {
  let component: ConfirmCancelationComponent;
  let fixture: ComponentFixture<ConfirmCancelationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmCancelationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmCancelationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
