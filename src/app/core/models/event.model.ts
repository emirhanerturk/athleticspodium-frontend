import { BaseModel } from '@models/base.model';

export class Event extends BaseModel {
  id: number;
  name: string;
  rank: number;
}
