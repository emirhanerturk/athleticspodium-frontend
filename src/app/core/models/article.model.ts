import { BaseModel } from '@models/base.model';

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
}
