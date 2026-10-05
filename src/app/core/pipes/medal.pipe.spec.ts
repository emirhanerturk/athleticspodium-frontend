import { MedalPipe } from './medal.pipe';

describe('MedalPipe', () => {
  const pipe = new MedalPipe();

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('gives medals their icon', () => {
    expect(pipe.transform(1).icon).toBe('/assets/medals/gold.svg');
    expect(pipe.transform(3).icon).toBe('/assets/medals/bronze.svg');
  });

  it('gives placings 4-8 no icon, so the position is written instead', () => {
    expect([4, 5, 6, 7, 8].map((place) => pipe.transform(place).icon)).toEqual([null, null, null, null, null]);
  });

  it('keeps the non-medal icon for values that are neither medals nor placings', () => {
    expect(pipe.transform(null).icon).toBe('/assets/medals/non-medal.svg');
    expect(pipe.transform(9).icon).toBe('/assets/medals/non-medal.svg');
  });
});
