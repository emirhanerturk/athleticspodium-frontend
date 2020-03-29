import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryMedalCountTableComponent } from './country-medal-count-table.component';

describe('CountryMedalCountTableComponent', () => {
  let component: CountryMedalCountTableComponent;
  let fixture: ComponentFixture<CountryMedalCountTableComponent>;

  beforeEach(async(() => {
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
