import { Pipe, PipeTransform } from '@angular/core';
import { EGender, IGenderInfo, EGenderInfo } from '@enums/gender.enum';

@Pipe({
  name: 'gender'
})
export class GenderPipe implements PipeTransform {

  transform(value: EGender): IGenderInfo {

    return EGenderInfo.find(g => g.id == value);
    
  }

}
