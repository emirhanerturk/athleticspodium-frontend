import { Injectable } from '@angular/core';

import { ChampsService } from '@services/champs.service';
import { EventService } from '@services/event.service';
import { MedalService } from '@services/medal.service';
import { IChamps, IMedal } from '@interfaces/models.interface';
import { Event } from '@models/event.model';
import { EGender, EMedal } from '@enums/index';

export interface ICompareEventOption {
  event_id: number;
  gender: EGender;
  name: string;
  label: string;
}

export interface IMarkDiff {
  display: string;
  sign: 'plus' | 'minus' | 'zero';
}

export interface ICompareYearRow {
  year: number;
  podiumA?: IMedal[];
  podiumB?: IMedal[];
  winnerA?: IMedal;
  winnerB?: IMedal;
}

const GENDER_LABELS: { [key: number]: string } = {
  [EGender.MEN]: 'Men',
  [EGender.WOMEN]: 'Women',
  [EGender.MIXED]: 'Mixed',
};

@Injectable({
  providedIn: 'root',
})
export class CompareService {
  constructor(
    private champsService: ChampsService,
    private eventService: EventService,
    private medalService: MedalService
  ) {}

  /**
   * Load the champs list (for the A/B selectors). Includes the event arrays
   * so the event dropdown can be built without fetching each champ.
   */
  async getChampsList(): Promise<IChamps[]> {
    const res = await this.champsService.List(
      ['id', 'name', 'slug', 'events_men', 'events_women', 'events_mixed'],
      'name'
    );
    return res.success ? res.data.rows ?? res.data : [];
  }

  /**
   * Load every event (event id -> name lookup).
   */
  async getEvents(): Promise<Event[]> {
    const res = await this.eventService.List();
    return res.success ? res.data.rows ?? res.data : [];
  }

  /**
   * Fetch every medal of a champ for a single event + gender in one logical
   * request (paging through the /medals endpoint when there are >100 rows).
   * Each row carries its meeting (year), athlete and country.
   */
  async getMedals(
    champId: number,
    eventId: number,
    gender: EGender
  ): Promise<IMedal[]> {
    const all: IMedal[] = [];
    let page = 1;

    while (true) {
      const res = await this.medalService.List({
        champs: champId,
        event: eventId,
        gender,
        order: 'year',
        page,
      });

      if (!res.success) break;

      const rows: IMedal[] = res.data?.rows ?? [];
      all.push(...rows);

      const count: number = res.data?.count ?? all.length;
      if (rows.length === 0 || all.length >= count) break;
      page++;
    }

    return all;
  }

  /**
   * The event ids of a champ for a given gender.
   */
  private genderEventIds(champ: IChamps, gender: EGender): number[] {
    if (!champ) return [];
    switch (gender) {
      case EGender.MEN:
        return champ.events_men ?? [];
      case EGender.WOMEN:
        return champ.events_women ?? [];
      case EGender.MIXED:
        return champ.events_mixed ?? [];
      default:
        return [];
    }
  }

  /**
   * Build the branch (event + gender) options for the dropdown.
   * The union of both champs' events for the requested gender(s).
   * @param genderFilter when null/undefined, include Men, Women and Mixed ("All").
   */
  buildEventOptions(
    champA: IChamps,
    champB: IChamps,
    events: Event[],
    genderFilter?: EGender | null
  ): ICompareEventOption[] {
    const eventMap = new Map<number, Event>();
    (events ?? []).forEach((e) => eventMap.set(e.id, e));

    const genders =
      genderFilter === null || genderFilter === undefined
        ? [EGender.MEN, EGender.WOMEN, EGender.MIXED]
        : [genderFilter];

    const options: ICompareEventOption[] = [];

    genders.forEach((gender) => {
      const ids = new Set<number>([
        ...this.genderEventIds(champA, gender),
        ...this.genderEventIds(champB, gender),
      ]);

      ids.forEach((id) => {
        const event = eventMap.get(id);
        if (!event) return;
        options.push({
          event_id: id,
          gender,
          name: event.name,
          label: `${event.name} (${GENDER_LABELS[gender]})`,
        });
      });
    });

    const rankOf = (id: number) => eventMap.get(id)?.rank ?? 99;
    return options.sort((a, b) => {
      const ra = rankOf(a.event_id);
      const rb = rankOf(b.event_id);
      if (ra !== rb) return ra - rb;
      if (a.name !== b.name) return a.name.localeCompare(b.name);
      return a.gender - b.gender;
    });
  }

  /**
   * Group both champs' medals by year and build the comparison rows.
   * Years are the union of both sides, descending; each year's podium is
   * sorted by medal (gold, silver, bronze).
   */
  buildRowsFromMedals(
    medalsA: IMedal[],
    medalsB: IMedal[]
  ): ICompareYearRow[] {
    const groupByYear = (medals: IMedal[]) => {
      const map = new Map<number, IMedal[]>();
      (medals ?? []).forEach((m) => {
        const year = m.meeting?.year;
        if (year === null || year === undefined) return;
        if (!map.has(year)) map.set(year, []);
        map.get(year)!.push(m);
      });
      map.forEach((list) =>
        list.sort((x, y) => (x.medal ?? 99) - (y.medal ?? 99))
      );
      return map;
    };

    const a = groupByYear(medalsA);
    const b = groupByYear(medalsB);

    const years = new Set<number>([...a.keys(), ...b.keys()]);

    return [...years]
      .sort((x, y) => y - x)
      .map((year) => {
        const podiumA = a.get(year) ?? [];
        const podiumB = b.get(year) ?? [];
        return {
          year,
          podiumA,
          podiumB,
          winnerA: this.extractWinner(podiumA) ?? undefined,
          winnerB: this.extractWinner(podiumB) ?? undefined,
        };
      });
  }

  /**
   * The gold medallist (winner) of a podium, or null.
   */
  extractWinner(podium: IMedal[]): IMedal | null {
    if (!podium || !podium.length) return null;
    return podium.find((m) => m.medal === EMedal.GOLD) ?? null;
  }

  /**
   * The podium without the gold medal (silver, bronze, …) — used for the
   * expanded view so the winner isn't repeated.
   */
  restOfPodium(podium: IMedal[]): IMedal[] {
    if (!podium || !podium.length) return [];
    return podium.filter((m) => m.medal !== EMedal.GOLD);
  }

  /**
   * Parse a displayed mark ("9.58", "3:45.67", "1:02:03.4") into a single
   * comparable number (seconds for times, the value itself otherwise).
   */
  private parseMark(display: string): number | null {
    if (display === null || display === undefined || display === '') return null;
    const s = display.toString().trim();
    if (s.includes(':')) {
      const parts = s.split(':').map((p) => Number(p));
      if (parts.some((p) => isNaN(p))) return null;
      return parts.reduce((acc, p) => acc * 60 + p, 0);
    }
    const n = Number(s);
    return isNaN(n) ? null : n;
  }

  /**
   * Format a (non-negative) numeric value back into a mark pattern.
   * Decimal patterns ("0.00") give "0.21"; sexagesimal patterns ("0:00.00",
   * "0:00:00") group the whole part into minutes/seconds/hours ("0:01:35").
   */
  private formatByPattern(value: number, pattern: string): string {
    if (!pattern) return value.toString();

    const dotIndex = pattern.lastIndexOf('.');
    const decimals = dotIndex === -1 ? 0 : pattern.length - dotIndex - 1;
    const intPattern = dotIndex === -1 ? pattern : pattern.substring(0, dotIndex);
    const colonGroups = intPattern.split(':');

    const factor = Math.pow(10, decimals);
    const totalSub = Math.round(value * factor);
    const frac = totalSub % factor;
    let whole = Math.floor(totalSub / factor);

    let result: string;
    if (colonGroups.length <= 1) {
      result = whole.toString();
    } else {
      const parts: number[] = [];
      for (let i = colonGroups.length - 1; i >= 1; i--) {
        parts.unshift(whole % 60);
        whole = Math.floor(whole / 60);
      }
      parts.unshift(whole);
      result = parts[0].toString();
      for (let i = 1; i < parts.length; i++) {
        result += ':' + parts[i].toString().padStart(2, '0');
      }
    }

    if (decimals > 0) {
      result += '.' + frac.toString().padStart(decimals, '0');
    }
    return result;
  }

  /**
   * The signed difference (A − B) between two marks, formatted with champ A's
   * mark format. Returns null when the marks aren't comparable.
   */
  markDiff(a: IMedal | null, b: IMedal | null): IMarkDiff | null {
    if (!a || !b) return null;
    if (a.is_canceled || b.is_canceled) return null;

    const va = this.parseMark(a.mark_display);
    const vb = this.parseMark(b.mark_display);
    if (va === null || vb === null) return null;

    const pattern = a.mark_format || '';
    const dotIndex = pattern.lastIndexOf('.');
    const decimals = dotIndex === -1 ? 0 : pattern.length - dotIndex - 1;

    const d = va - vb;
    const roundedSub = Math.round(Math.abs(d) * Math.pow(10, decimals));

    if (roundedSub === 0) {
      return { display: '±' + this.formatByPattern(0, pattern), sign: 'zero' };
    }

    const sign = d > 0 ? 'plus' : 'minus';
    const prefix = d > 0 ? '+' : '−';
    return { display: prefix + this.formatByPattern(Math.abs(d), pattern), sign };
  }
}
