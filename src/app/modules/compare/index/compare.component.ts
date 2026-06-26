import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AppService } from '@services/app.service';
import {
  CompareService,
  ICompareEventOption,
  ICompareYearRow,
  IMarkDiff,
} from '@services/compare.service';
import { IBreadcrumb, IChamps, IMedal } from '@interfaces/index';
import { Event } from '@models/event.model';
import { ENavigation, EGender } from '@enums/index';

interface IExtraRow {
  a: IMedal | null;
  b: IMedal | null;
}

@Component({
  selector: 'app-compare',
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.scss'],
})
export class CompareComponent implements OnInit {
  loading = true;
  loadingResults = false;
  error: any;
  formError = false;
  submitted = false;
  breadcrumbs: IBreadcrumb[] = [{ name: 'Compare', uri: '/compare' }];

  champsList: IChamps[] = [];
  events: Event[] = [];

  // form values
  champAId: number | null = null;
  champBId: number | null = null;
  gender: string = ''; // '' = All
  selectedOption: ICompareEventOption | null = null;

  eventOptions: ICompareEventOption[] = [];

  // results
  champA: IChamps | null = null;
  champB: IChamps | null = null;
  rows: ICompareYearRow[] = [];
  expanded = new Set<number>();

  constructor(
    private appService: AppService,
    private compareService: CompareService
  ) {}

  async ngOnInit() {
    this.appService.setNavigation(ENavigation.COMPARE);
    this.appService.setTitle('Compare Championships');
    this.appService.setMeta(
      'Compare two championships side by side: event winners and marks year by year.'
    );

    this.loading = true;
    try {
      [this.champsList, this.events] = await Promise.all([
        this.compareService.getChampsList(),
        this.compareService.getEvents(),
      ]);
    } catch (e) {
      this.error = e;
    }
    this.loading = false;
  }

  /**
   * Rebuild the event dropdown whenever a championship or gender changes.
   */
  onSelectionChange(): void {
    const a = this.champsList.find((c) => c.id === Number(this.champAId));
    const b = this.champsList.find((c) => c.id === Number(this.champBId));

    if (!a || !b) {
      this.eventOptions = [];
      this.selectedOption = null;
      return;
    }

    const genderFilter = this.gender === '' ? null : Number(this.gender);
    this.eventOptions = this.compareService.buildEventOptions(
      a,
      b,
      this.events,
      genderFilter as EGender | null
    );

    // keep selection if still present
    const stillThere =
      this.selectedOption &&
      this.eventOptions.find(
        (o) =>
          o.event_id === this.selectedOption!.event_id &&
          o.gender === this.selectedOption!.gender
      );
    this.selectedOption = stillThere ?? null;
  }

  async onSubmit(form: NgForm): Promise<void> {
    this.formError = false;

    if (!this.champAId || !this.champBId || !this.selectedOption) {
      this.formError = true;
      return;
    }

    this.submitted = true;
    this.loadingResults = true;
    this.error = null;
    this.expanded.clear();

    // champ names for the table headers come from the already-loaded list
    this.champA = this.champsList.find((c) => c.id === Number(this.champAId)) ?? null;
    this.champB = this.champsList.find((c) => c.id === Number(this.champBId)) ?? null;

    const { event_id, gender } = this.selectedOption;

    try {
      const [medalsA, medalsB] = await Promise.all([
        this.compareService.getMedals(this.champAId, event_id, gender),
        this.compareService.getMedals(this.champBId, event_id, gender),
      ]);

      this.rows = this.compareService.buildRowsFromMedals(medalsA, medalsB);
    } catch (e) {
      this.error = e;
    }

    this.loadingResults = false;
  }

  /**
   * The non-gold medals of both sides, aligned row by row, for the expanded view.
   */
  getExtraRows(row: ICompareYearRow): IExtraRow[] {
    const a = this.compareService.restOfPodium(row.podiumA ?? []);
    const b = this.compareService.restOfPodium(row.podiumB ?? []);
    const len = Math.max(a.length, b.length);
    const out: IExtraRow[] = [];
    for (let i = 0; i < len; i++) {
      out.push({ a: a[i] ?? null, b: b[i] ?? null });
    }
    return out;
  }

  /** Signed mark difference (A − B) for a pair of medals. */
  diff(a: IMedal | null, b: IMedal | null): IMarkDiff | null {
    return this.compareService.markDiff(a, b);
  }

  hasExtra(row: ICompareYearRow): boolean {
    return (
      this.compareService.restOfPodium(row.podiumA ?? []).length > 0 ||
      this.compareService.restOfPodium(row.podiumB ?? []).length > 0
    );
  }

  onYearClick(row: ICompareYearRow): void {
    if (this.hasExtra(row)) this.toggleExpand(row.year);
  }

  toggleExpand(year: number): void {
    if (this.expanded.has(year)) {
      this.expanded.delete(year);
    } else {
      this.expanded.add(year);
    }
  }

  isExpanded(year: number): boolean {
    return this.expanded.has(year);
  }

  trackByYear(_: number, row: ICompareYearRow): number {
    return row.year;
  }
}
