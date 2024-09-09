import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SimpleNotesComponent } from './simple-notes.component';

describe('SimpleNotesComponent', () => {
  let component: SimpleNotesComponent;
  let fixture: ComponentFixture<SimpleNotesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SimpleNotesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
