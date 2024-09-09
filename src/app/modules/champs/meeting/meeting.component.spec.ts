import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MeetingComponent } from './meeting.component';

describe('MeetingComponent', () => {
  let component: MeetingComponent;
  let fixture: ComponentFixture<MeetingComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MeetingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeetingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
