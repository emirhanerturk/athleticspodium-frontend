import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MissingInformationComponent } from './missing-information.component';

describe('MissingInformationComponent', () => {
  let component: MissingInformationComponent;
  let fixture: ComponentFixture<MissingInformationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MissingInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MissingInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
