import { BaseModel } from "@models/base.model";
import { ECategory } from "@enums/category.enum";
import { Meeting } from "./meeting.model";

export class Champ extends BaseModel {
  id: number;
  name: string;
  slug: string;
  category: ECategory;
  countries: string[];
  years: number[];
  events_men: number[];
  events_women: number[];
  events_mixed: number[];
  content: string;
  rank: number;
  created_date: Date;
  updated_date: Date;
  // includes
  meetings: Meeting[];
}
