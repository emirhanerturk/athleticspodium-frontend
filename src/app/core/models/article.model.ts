import { BaseModel } from '@models/base.model';
import { Champ } from './champ.model';
import { Country } from './country.model';
import { Meeting } from './meeting.model';

export class Article extends BaseModel {
  id: number;
  status: 'ACTIVE'|'PENDING'|'DRAFT'|'PASSIVE';
  account_id: number;
  title: string;
  slug: string;
  description: string;
  spot: string;
  image: any;
  content: string;
  redirect: string;
  views: number;
  related_champs: number[];
  related_meetings: number[];
  related_athletes: number[];
  related_countries: number[];
  created_date: Date;
  updated_date: Date;
  related_champs_map: Champ[];
  related_meetings_map: Meeting[];
  related_athletes_map: any[];
  related_countries_map: Country[];
}
