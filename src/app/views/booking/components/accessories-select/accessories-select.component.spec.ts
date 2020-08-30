import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessoriesSelectComponent } from './accessories-select.component';

describe('AccessoriesSelectComponent', () => {
  let component: AccessoriesSelectComponent;
  let fixture: ComponentFixture<AccessoriesSelectComponent>;

  beforeEach(async(() => {
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
