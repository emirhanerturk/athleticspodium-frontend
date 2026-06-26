import { TestBed } from '@angular/core/testing';

import { CompareService } from './compare.service';
import { ChampsService } from '@services/champs.service';
import { EventService } from '@services/event.service';
import { MedalService } from '@services/medal.service';
import { EGender } from '@enums/index';

describe('CompareService', () => {
  let service: CompareService;
  let medalServiceSpy: jasmine.SpyObj<MedalService>;

  const events = [
    { id: 1, name: '100m', rank: 1 },
    { id: 2, name: '200m', rank: 2 },
    { id: 3, name: '4x100m Relay', rank: 3 },
  ] as any[];

  const champA = {
    id: 10,
    name: 'Germany',
    events_men: [1, 2],
    events_women: [1],
    events_mixed: [3],
  } as any;

  const champB = {
    id: 20,
    name: 'France',
    events_men: [2],
    events_women: [1],
    events_mixed: [],
  } as any;

  beforeEach(() => {
    medalServiceSpy = jasmine.createSpyObj('MedalService', ['List']);

    TestBed.configureTestingModule({
      providers: [
        CompareService,
        { provide: ChampsService, useValue: {} },
        { provide: EventService, useValue: {} },
        { provide: MedalService, useValue: medalServiceSpy },
      ],
    });

    service = TestBed.inject(CompareService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('buildEventOptions', () => {
    it('unions both champs events for a single gender', () => {
      const opts = service.buildEventOptions(champA, champB, events, EGender.MEN);
      // men: A=[1,2], B=[2] => union {1,2}
      expect(opts.map((o) => o.event_id)).toEqual([1, 2]);
      expect(opts.every((o) => o.gender === EGender.MEN)).toBeTrue();
      expect(opts[0].label).toBe('100m (Men)');
    });

    it('includes all genders when filter is null ("All")', () => {
      const opts = service.buildEventOptions(champA, champB, events, null);
      // men {1,2}, women {1}, mixed {3} => 4 options
      expect(opts.length).toBe(4);
      const labels = opts.map((o) => o.label);
      expect(labels).toContain('100m (Men)');
      expect(labels).toContain('100m (Women)');
      expect(labels).toContain('4x100m Relay (Mixed)');
    });

    it('sorts by event rank', () => {
      const opts = service.buildEventOptions(champA, champB, events, EGender.MEN);
      const ranks = opts.map((o) => o.event_id);
      expect(ranks).toEqual([1, 2]);
    });

    it('skips events missing from the events lookup', () => {
      const partial = [{ id: 1, name: '100m', rank: 1 }] as any[];
      const opts = service.buildEventOptions(champA, champB, partial, EGender.MEN);
      expect(opts.map((o) => o.event_id)).toEqual([1]);
    });
  });

  describe('getMedals', () => {
    it('requests /medals filtered by champ, event and gender', async () => {
      medalServiceSpy.List.and.returnValue(
        Promise.resolve({ success: true, data: { count: 1, rows: [{ id: 1 }] } })
      );

      await service.getMedals(10, 1, EGender.MEN);

      expect(medalServiceSpy.List).toHaveBeenCalledWith({
        champs: 10,
        event: 1,
        gender: EGender.MEN,
        order: 'year',
        page: 1,
      });
    });

    it('pages through results until count is reached', async () => {
      const page1 = {
        success: true,
        data: { count: 150, rows: new Array(100).fill({ id: 1 }) },
      };
      const page2 = {
        success: true,
        data: { count: 150, rows: new Array(50).fill({ id: 2 }) },
      };
      medalServiceSpy.List.and.callFake((q: any) =>
        Promise.resolve(q.page === 1 ? page1 : page2)
      );

      const all = await service.getMedals(10, 1, EGender.MEN);

      expect(medalServiceSpy.List).toHaveBeenCalledTimes(2);
      expect(all.length).toBe(150);
    });

    it('stops on a single page when count fits', async () => {
      medalServiceSpy.List.and.returnValue(
        Promise.resolve({ success: true, data: { count: 3, rows: [{}, {}, {}] } })
      );

      const all = await service.getMedals(10, 1, EGender.MEN);

      expect(medalServiceSpy.List).toHaveBeenCalledTimes(1);
      expect(all.length).toBe(3);
    });
  });

  describe('buildRowsFromMedals', () => {
    const medal = (year: number, m: number, name: string): any => ({
      medal: m,
      athlete_name: name,
      meeting: { year },
    });

    it('groups by year (union, desc) with sorted podiums and winners', () => {
      const medalsA = [
        medal(2024, 2, 'A-silver'),
        medal(2024, 1, 'A-gold'),
        medal(2022, 1, 'A-gold-22'),
      ];
      const medalsB = [medal(2024, 1, 'B-gold'), medal(2023, 1, 'B-gold-23')];

      const rows = service.buildRowsFromMedals(medalsA, medalsB);

      expect(rows.map((r) => r.year)).toEqual([2024, 2023, 2022]);

      const y2024 = rows.find((r) => r.year === 2024)!;
      expect(y2024.podiumA!.map((m) => m.medal)).toEqual([1, 2]); // sorted
      expect(y2024.winnerA!.athlete_name).toBe('A-gold');
      expect(y2024.winnerB!.athlete_name).toBe('B-gold');

      const y2023 = rows.find((r) => r.year === 2023)!;
      expect(y2023.winnerA).toBeUndefined();
      expect(y2023.winnerB!.athlete_name).toBe('B-gold-23');

      const y2022 = rows.find((r) => r.year === 2022)!;
      expect(y2022.winnerA!.athlete_name).toBe('A-gold-22');
      expect(y2022.winnerB).toBeUndefined();
    });
  });

  describe('extractWinner / restOfPodium', () => {
    const podium = [
      { medal: 1, athlete_name: 'A' },
      { medal: 2, athlete_name: 'B' },
      { medal: 3, athlete_name: 'C' },
    ] as any[];

    it('extracts the gold medallist as the winner', () => {
      expect(service.extractWinner(podium)!.athlete_name).toBe('A');
    });

    it('returns null when there is no gold medallist', () => {
      expect(service.extractWinner([])).toBeNull();
      expect(
        service.extractWinner([{ medal: 2 } as any, { medal: 3 } as any])
      ).toBeNull();
    });

    it('restOfPodium drops the gold medal', () => {
      expect(service.restOfPodium(podium).map((m) => m.medal)).toEqual([2, 3]);
    });

    it('restOfPodium is empty for an empty podium', () => {
      expect(service.restOfPodium([])).toEqual([]);
    });
  });

  describe('markDiff', () => {
    const m = (mark_display: string, mark_format = '0.00', extra = {}): any => ({
      mark_display,
      mark_format,
      ...extra,
    });

    it('returns null when a side is missing', () => {
      expect(service.markDiff(null, m('9.58'))).toBeNull();
      expect(service.markDiff(m('9.58'), null)).toBeNull();
    });

    it('returns null when a result is canceled', () => {
      expect(
        service.markDiff(m('9.58', '0.00', { is_canceled: true }), m('9.79'))
      ).toBeNull();
    });

    it('formats a positive difference for decimal marks', () => {
      const d = service.markDiff(m('9.79'), m('9.58'))!;
      expect(d.sign).toBe('plus');
      expect(d.display).toBe('+0.21');
    });

    it('formats a negative difference', () => {
      const d = service.markDiff(m('9.58'), m('9.79'))!;
      expect(d.sign).toBe('minus');
      expect(d.display).toBe('−0.21');
    });

    it('marks an equal result as zero', () => {
      const d = service.markDiff(m('9.58'), m('9.58'))!;
      expect(d.sign).toBe('zero');
      expect(d.display).toBe('±0.00');
    });

    it('formats a colon time diff using champ A pattern', () => {
      // 3:46.00 − 3:45.67 = 0.33s -> "0:00.33" in 0:00.00 format
      const d = service.markDiff(
        m('3:46.00', '0:00.00'),
        m('3:45.67', '0:00.00')
      )!;
      expect(d.sign).toBe('plus');
      expect(d.display).toBe('+0:00.33');
    });

    it('groups larger time diffs into minutes', () => {
      // 5:00.00 − 3:00.00 = 120s -> "2:00.00"
      const d = service.markDiff(
        m('5:00.00', '0:00.00'),
        m('3:00.00', '0:00.00')
      )!;
      expect(d.display).toBe('+2:00.00');
    });

    it('supports hour:minute:second patterns', () => {
      // 2:05:30 − 2:04:00 = 90s -> "0:01:30" in 0:00:00 format
      const d = service.markDiff(
        m('2:05:30', '0:00:00'),
        m('2:04:00', '0:00:00')
      )!;
      expect(d.display).toBe('+0:01:30');
    });

    it('uses champ A format even when formats differ', () => {
      // A is 0:00.00 (mins), B given as plain seconds 225.67
      const d = service.markDiff(
        m('3:46.00', '0:00.00'),
        m('225.67', '0.00')
      )!;
      // 226.00 - 225.67 = 0.33 -> A pattern 0:00.00 -> "0:00.33"
      expect(d.display).toBe('+0:00.33');
    });
  });
});
