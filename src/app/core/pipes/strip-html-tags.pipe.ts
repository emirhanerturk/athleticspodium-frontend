import { Pipe, PipeTransform } from '@angular/core';

import { StripHtmlTags } from "@services/util.service";

@Pipe({
  name: 'stripHtmlTags'
})
export class StripHtmlTagsPipe implements PipeTransform {

  transform(value: string): any {
    return StripHtmlTags(value);
  }

}
