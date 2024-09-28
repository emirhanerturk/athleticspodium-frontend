import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryChampsFormComponent } from './country-champs-form.component';

describe('CountryChampsFormComponent', () => {
  let component: CountryChampsFormComponent;
  let fixture: ComponentFixture<CountryChampsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CountryChampsFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CountryChampsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
