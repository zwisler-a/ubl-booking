import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CapacityViewComponent } from './capacity-view.component';

describe('CapacityViewComponent', () => {
  let component: CapacityViewComponent;
  let fixture: ComponentFixture<CapacityViewComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CapacityViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CapacityViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
