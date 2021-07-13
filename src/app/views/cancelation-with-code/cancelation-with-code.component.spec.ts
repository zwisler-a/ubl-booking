import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CancelationWithCodeComponent } from './cancelation-with-code.component';

describe('CancelationWithCodeComponent', () => {
  let component: CancelationWithCodeComponent;
  let fixture: ComponentFixture<CancelationWithCodeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CancelationWithCodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CancelationWithCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
