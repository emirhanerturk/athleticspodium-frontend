import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { CompareComponent } from './compare.component';
import { AppService } from '@services/app.service';
import { CompareService } from '@services/compare.service';

describe('CompareComponent', () => {
  let component: CompareComponent;
  let fixture: ComponentFixture<CompareComponent>;

  const appServiceStub = {
    setNavigation: () => {},
    setTitle: () => {},
    setMeta: () => {},
  };

  const compareServiceStub = {
    getChampsList: () => Promise.resolve([]),
    getEvents: () => Promise.resolve([]),
    getMedals: () => Promise.resolve([]),
    buildEventOptions: () => [],
    buildRowsFromMedals: () => [],
    restOfPodium: () => [],
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CompareComponent],
      imports: [RouterTestingModule, FormsModule],
      providers: [
        { provide: AppService, useValue: appServiceStub },
        { provide: CompareService, useValue: compareServiceStub },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('toggles podium expansion per year', () => {
    expect(component.isExpanded(2024)).toBeFalse();
    component.toggleExpand(2024);
    expect(component.isExpanded(2024)).toBeTrue();
    component.toggleExpand(2024);
    expect(component.isExpanded(2024)).toBeFalse();
  });
});
