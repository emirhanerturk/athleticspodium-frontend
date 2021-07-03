import { BaseModel } from "@models/base.model";
import { ECategory } from "@enums/category.enum";

export class Country extends BaseModel {
  code: string;
  name: string;
  content: string;
  categories: ECategory[];
  is_country: boolean;
  created_date: Date;
  updated_date: Date;
}
