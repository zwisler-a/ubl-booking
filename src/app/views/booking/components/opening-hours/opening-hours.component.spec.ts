import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { OpeningHoursComponent } from './opening-hours.component';

describe('OpeningHoursComponent', () => {
  let component: OpeningHoursComponent;
  let fixture: ComponentFixture<OpeningHoursComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ OpeningHoursComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpeningHoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
