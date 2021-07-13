import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { InstitutionSelectComponent } from './institution-select.component';

describe('InstitutionSelectComponent', () => {
  let component: InstitutionSelectComponent;
  let fixture: ComponentFixture<InstitutionSelectComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ InstitutionSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstitutionSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
