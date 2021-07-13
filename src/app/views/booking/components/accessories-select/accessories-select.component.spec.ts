import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AccessoriesSelectComponent } from './accessories-select.component';

describe('AccessoriesSelectComponent', () => {
  let component: AccessoriesSelectComponent;
  let fixture: ComponentFixture<AccessoriesSelectComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AccessoriesSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccessoriesSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
