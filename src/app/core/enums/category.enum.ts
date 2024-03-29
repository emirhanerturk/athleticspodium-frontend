export enum ECategory {
  UNIVERSAL,
  AFRICA,
  ASIA,
  EUROPE,
  AMERICA,
  OCEANIA,
  REGIONAL,
  NATIONALS,
  ROAD_RACES,
}

export interface ICategoryInfo {
  id: number;
  name: string;
  champs: boolean;
  country: boolean;
}

export const ECategoryInfo: ICategoryInfo[] = [
  {
    id: 0,
    name: 'Universal',
    champs: true,
    country: false,
  },
  {
    id: 1,
    name: 'Africa',
    champs: true,
    country: true,
  },
  {
    id: 2,
    name: 'Asia',
    champs: true,
    country: true,
  },
  {
    id: 3,
    name: 'Europe',
    champs: true,
    country: true,
  },
  {
    id: 4,
    name: 'America',
    champs: true,
    country: true,
  },
  {
    id: 5,
    name: 'Oceania',
    champs: true,
    country: true,
  },
  {
    id: 6,
    name: 'Regional',
    champs: true,
    country: false,
  },
  {
    id: 7,
    name: 'National',
    champs: true,
    country: false,
  },
  {
    id: 8,
    name: 'Road Races',
    champs: true,
    country: false,
  },
];
