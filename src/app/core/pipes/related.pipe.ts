import { Pipe, PipeTransform } from '@angular/core';
import { ERelated, IRelatedInfo, ERelatedInfo } from '@enums/related.enum';

@Pipe({
  name: 'related'
})
export class RelatedPipe implements PipeTransform {

  transform(value: ERelated): IRelatedInfo {

    return ERelatedInfo.find(r => r.id == value);
    
  }

}
