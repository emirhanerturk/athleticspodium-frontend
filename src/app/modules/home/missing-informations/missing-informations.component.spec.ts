import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MissingInformationsComponent } from './missing-informations.component';

describe('MissingInformationsComponent', () => {
  let component: MissingInformationsComponent;
  let fixture: ComponentFixture<MissingInformationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MissingInformationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MissingInformationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
