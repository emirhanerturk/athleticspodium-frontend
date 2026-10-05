import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DetailComponent } from './detail.component';
import { ECategory } from '@enums/category.enum';

describe('DetailComponent medal sections', () => {
  const olympics = { id: 40, name: 'Olympic Games', slug: 'olympic-games', category: ECategory.UNIVERSAL, rank: 1 };
  const worldIndoors = { id: 7, name: 'World Indoor Championships', slug: 'world-indoor-championships', category: ECategory.UNIVERSAL, rank: 3 };
  const europeans = { id: 2, name: 'European Championships', slug: 'european-championships', category: ECategory.EUROPE, rank: 5 };
  const nationals = { id: 300, name: 'Turkish Championships', slug: 'turkish-championships', category: ECategory.NATIONALS, rank: 99 };
  const row = (id: number, medal: number, champ: any, is_canceled = false) =>
    ({ id, medal, champ_id: champ.id, champ: { ...champ }, is_canceled }) as any;

  // Loads the rows the way the profile does: through the athlete's medals request
  async function load(rows: any[]): Promise<DetailComponent> {
    const athleteService = { GetAthleteAllMedals: () => Promise.resolve({ success: true, data: rows }) } as any;
    const component = new DetailComponent(null, null, null, athleteService, null);
    await component.getMedals();
    return component;
  }

  it('lists medals, other achievements (4th-8th) and national titles separately', async () => {
    const component = await load([
      row(1, 1, olympics),
      row(2, 4, olympics),
      row(3, 3, europeans),
      row(4, 8, europeans),
      row(5, 2, nationals),
      row(6, 5, nationals), // placings are not entered for national champs, and never shown there
      row(7, null, olympics, true), // a canceled medal of unknown colour stays a medal
    ]);

    expect(component.medals.map((m) => m.id)).toEqual([1, 3, 7]);
    expect(component.medalsOthers.map((m) => m.id)).toEqual([2, 4]);
    expect(component.medalsNationals.map((m) => m.id)).toEqual([5]);
  });

  it('counts only medals in the totals', async () => {
    const component = await load([
      row(1, 1, olympics),
      row(2, 4, olympics),
      row(3, 6, worldIndoors), // only a placing at this champ, so it gets no totals row
      row(4, 3, europeans),
    ]);

    expect(component.medalsCountTotals).toEqual({ gold: 1, silver: 0, bronze: 1, total: 2 });
    expect(component.medalsCount.map((c) => [c.id, c.medals.total])).toEqual([[40, 1], [2, 1]]);
  });
});

describe('DetailComponent', () => {
  let component: DetailComponent;
  let fixture: ComponentFixture<DetailComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
