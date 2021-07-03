import { BaseModel } from "@models/base.model";
import { Champ } from "./champ.model";
import { Country } from "./country.model";

export class Meeting extends BaseModel {
  id: number;
  champ_id: number;
  year: number;
  edition: number;
  short_name: string;
  name: string;
  slug: string;
  country_code: string;
  city: string;
  start_date: Date;
  end_date: Date;
  content: string;
  created_date: Date;
  updated_date: Date;
  // includes
  champ: Champ;
  country: Country;
  // others
  medalCount: number;
}
