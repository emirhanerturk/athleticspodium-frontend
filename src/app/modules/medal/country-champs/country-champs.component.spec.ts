import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryChampsComponent } from './country-champs.component';

describe('CountryChampsComponent', () => {
  let component: CountryChampsComponent;
  let fixture: ComponentFixture<CountryChampsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CountryChampsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CountryChampsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
