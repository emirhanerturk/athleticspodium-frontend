import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MedalSearchFormComponent } from './medal-search-form.component';

describe('MedalSearchFormComponent', () => {
  let component: MedalSearchFormComponent;
  let fixture: ComponentFixture<MedalSearchFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MedalSearchFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedalSearchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
