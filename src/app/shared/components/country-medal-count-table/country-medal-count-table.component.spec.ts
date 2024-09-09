import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CountryMedalCountTableComponent } from './country-medal-count-table.component';

describe('CountryMedalCountTableComponent', () => {
  let component: CountryMedalCountTableComponent;
  let fixture: ComponentFixture<CountryMedalCountTableComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CountryMedalCountTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CountryMedalCountTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
