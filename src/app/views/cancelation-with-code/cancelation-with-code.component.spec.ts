import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelationWithCodeComponent } from './cancelation-with-code.component';

describe('CancelationWithCodeComponent', () => {
  let component: CancelationWithCodeComponent;
  let fixture: ComponentFixture<CancelationWithCodeComponent>;

  beforeEach(async(() => {
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
