import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AthletesComponent } from './athletes.component';

describe('AthletesComponent', () => {
  let component: AthletesComponent;
  let fixture: ComponentFixture<AthletesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AthletesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AthletesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
